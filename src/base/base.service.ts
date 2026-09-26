import { BadRequestException, Injectable } from '@nestjs/common'

import type { BaseProviderOptions, BaseUserInfo, TelegramProfile } from '../interfaces'
import { createRemoteJWKSet, jwtVerify } from 'jose'
import { AllowedProvider } from '../enums'

@Injectable()
export class BaseService {
	private _baseUrl: string
	private readonly jwks = createRemoteJWKSet(new URL('https://oauth.telegram.org/.well-known/jwks.json'))

	public constructor(private readonly options: BaseProviderOptions) {}

	protected async extractUserInfo(data: any, accessToken?: string): Promise<BaseUserInfo> {
		return {
			...data,
			provider: this.options.name
		}
	}

	public getAuthUrl(state?: string) {
		const query = new URLSearchParams({
			response_type: 'code',
			client_id: this.options.clientId,
			redirect_uri: this.getRedirectUrl(),
			scope: (this.options.scopes ?? []).join(' '),
			state: state ?? ''
		})

		return `${this.options.authorizeUrl}?${query}`
	}

	public async getUserByCode(code: string): Promise<BaseUserInfo> {
		const clientId = this.options.clientId
		const clientSecret = this.options.clientSecret

		const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

		const tokensQuery = new URLSearchParams({
			client_id: clientId,
			client_secret: clientSecret,
			code,
			redirect_uri: this.getRedirectUrl(),
			grant_type: 'authorization_code'
		})

		const tokensRequest = await fetch(this.options.accessUrl, {
			method: 'POST',
			body: tokensQuery,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Accept: 'application/json'
			}
		})

		if (!tokensRequest.ok) {
			throw new BadRequestException(`Failed to fetch tokens from ${this.options.accessUrl}`)
		}

		const tokens = await tokensRequest.json()

		if (!tokens.access_token) {
			throw new BadRequestException(`No tokens ${this.options.accessUrl}`)
		}

		const isTelegram = this.options.name === AllowedProvider.TELEGRAM

		if (!isTelegram && !tokens.id_token) {
			throw new BadRequestException(`No id_token in ${this.options.name} response`)
		}

		const userRequest = await fetch(this.options.profileUrl, {
			headers: {
				Authorization: isTelegram ? `Bearer ${tokens.access_token}` : `Basic ${credentials}`
			}
		})

		if (!userRequest.ok) {
			throw new BadRequestException(`Failed to fetch user from ${this.options.profileUrl}`)
		}

		const user = await userRequest.json()

		const claims = isTelegram ? null : await this.verifyIdToken(tokens.id_token)

		const userData = await this.extractUserInfo(isTelegram ? user : claims)

		return {
			...userData,
			accessToken: tokens.access_token,
			refreshToken: tokens.refresh_token,
			expiry: tokens.expiresAt || tokens.expires_in,
			provider: this.options.name
		}
	}

	public async verifyIdToken(idToken: string): Promise<TelegramProfile> {
		const { payload } = await jwtVerify(idToken, this.jwks, {
			issuer: 'https://oauth.telegram.org',
			audience: this.options.clientId
		})

		return payload as unknown as TelegramProfile
	}

	public getRedirectUrl() {
		return `${this._baseUrl}/auth/sso/callback/${this.options.name}`
	}

	public set baseUrl(value: string) {
		this._baseUrl = value
	}

	public get name() {
		return this.options.name
	}

	public get accessUrl() {
		return this.options.accessUrl
	}

	public get profileUrl() {
		return this.options.profileUrl
	}

	public get scopes() {
		return this.options.scopes
	}
}