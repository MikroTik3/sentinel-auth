import { Injectable } from '@nestjs/common'

import { BaseService } from '../base/base.service'
import type { BaseUserInfo, DiscordProfile, ProviderOptions } from '../interfaces'
import { AllowedProvider } from '../enums'

@Injectable()
export class DiscordProvider extends BaseService {
       public constructor(options: ProviderOptions) {
              super({
                     name: AllowedProvider.DISCORD,
                     authorizeUrl: 'https://discord.com/oauth2/authorize?prompt=consent',
                     accessUrl: 'https://discord.com/api/v10/oauth2/token',
                     profileUrl: 'https://discord.com/api/v10/users/@me',
                     scopes: options.scopes,
                     clientId: options.clientId,
                     clientSecret: options.clientSecret,
              })
       }

       public async extractUserInfo(data: DiscordProfile): Promise<BaseUserInfo> {
              return super.extractUserInfo({
                     id: data.id,
                     name: data.global_name ?? data.username,
                     email: data.email ?? null,
                     avatar: data.avatar
                            ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
                            : null,
              })
       }
}