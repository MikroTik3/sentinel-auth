import { BadRequestException, Injectable } from '@nestjs/common'

import { BaseService } from '../base/base.service'
import type { BaseUserInfo, GithubProfile, ProviderOptions } from '../interfaces'
import { AllowedProvider } from '../enums'

@Injectable()
export class GithubProvider extends BaseService {
	public constructor(options: ProviderOptions) {
		super({
			name: AllowedProvider.GITHUB,
                     authorizeUrl: 'https://github.com/login/oauth/authorize',
                     accessUrl: 'https://github.com/login/oauth/access_token',
                     profileUrl: 'https://api.github.com/user',
			scopes: options.scopes,
			clientId: options.clientId,
			clientSecret: options.clientSecret
		})
	}

	public async extractUserInfo(data: GithubProfile, accessToken: string): Promise<BaseUserInfo> {
		let email = ''

              if (accessToken) {
                     const response = await fetch('https://api.github.com/user/emails', {
                            headers: {
                                   Authorization: `Bearer ${accessToken}`,
                                   Accept: 'application/json'
                            }
                     })

              if (response.ok)
                     throw new BadRequestException('Failed to fetch Github emails')

                     const emails = await response.json()

                     email = emails.find(e => e.primary && e.verified)?.email ?? ''
              }
                     
              return super.extractUserInfo({
                     id: data.id.toString(),
                     name: data.name || data.login,
                     email,
                     avatar: data.avatar_url
              })
	}
}