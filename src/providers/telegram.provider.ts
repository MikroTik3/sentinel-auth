// telegram.provider.ts
import { BadRequestException, Injectable } from '@nestjs/common'
import { createRemoteJWKSet, jwtVerify } from 'jose'

import { BaseService } from '../base/base.service'
import type { BaseUserInfo, ProviderOptions } from '../interfaces'
import type { TelegramProfile } from '../interfaces/telegram-profile.interface'
import { AllowedProvider } from '../enums'

@Injectable()
export class TelegramProvider extends BaseService {
       private readonly jwks = createRemoteJWKSet(new URL('https://oauth.telegram.org/.well-known/jwks.json'))

       public constructor(private readonly telegramOptions: ProviderOptions) {
              super({
                     name: AllowedProvider.TELEGRAM,
                     authorizeUrl: 'https://oauth.telegram.org/auth',
                     accessUrl: 'https://oauth.telegram.org/token',
                     profileUrl: '',
                     scopes: telegramOptions.scopes?.length ? telegramOptions.scopes : ['openid', 'profile'],
                     clientId: telegramOptions.clientId,
                     clientSecret: telegramOptions.clientSecret
              })
       }

       public async extractUserInfo(data: TelegramProfile): Promise<BaseUserInfo> {
              return super.extractUserInfo({
                     id: String(data.id), // именно id, а не sub — это настоящий Telegram user id
                     username: data.preferred_username,
                     name: data.name,
                     firstName: data.given_name,
                     lastName: data.family_name,
                     avatar: data.picture,
                     phone: data.phone_number
              })
       }

       public override async getUserByCode(code: string): Promise<BaseUserInfo> {
              const credentials = Buffer.from(
                     `${this.telegramOptions.clientId}:${this.telegramOptions.clientSecret}`
              ).toString('base64')

              const tokensQuery = new URLSearchParams({
                     grant_type: 'authorization_code',
                     code,
                     redirect_uri: this.getRedirectUrl(),
                     client_id: this.telegramOptions.clientId
              })

              const tokensRequest = await fetch(this.accessUrl, {
                     method: 'POST',
                     body: tokensQuery,
                     headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            Accept: 'application/json',
                            Authorization: `Basic ${credentials}`
                     }
              })

              if (!tokensRequest.ok) {
                     throw new BadRequestException(`Failed to fetch tokens from ${this.accessUrl}`)
              }

              const tokens = await tokensRequest.json()

              if (!tokens.id_token) {
                     throw new BadRequestException('No id_token in Telegram response')
              }

              const claims = await this.verifyIdToken(tokens.id_token)
              const userData = await this.extractUserInfo(claims)

              return {
                     ...userData,
                     accessToken: tokens.access_token,
                     refreshToken: tokens.refresh_token,
                     expiry: tokens.expires_in,
                     provider: this.name
              }
       }

       private async verifyIdToken(idToken: string): Promise<TelegramProfile> {
              const { payload } = await jwtVerify(idToken, this.jwks, {
                     issuer: 'https://oauth.telegram.org',
                     audience: this.telegramOptions.clientId
              })

              return payload as unknown as TelegramProfile
       }
}