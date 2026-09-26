import { Injectable } from '@nestjs/common'

import { BaseService } from '../base/base.service'
import type { BaseUserInfo, ProviderOptions } from '../interfaces'
import type { TelegramProfile } from '../interfaces/telegram-profile.interface'
import { AllowedProvider } from '../enums'

@Injectable()
export class TelegramProvider extends BaseService {
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
                     id: String(data.id),
                     username: data.preferred_username,
                     name: data.name,
                     firstName: data.given_name,
                     lastName: data.family_name,
                     avatar: data.picture,
                     phone: data.phone_number
              })
       }
}