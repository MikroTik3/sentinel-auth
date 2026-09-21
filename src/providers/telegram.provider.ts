import { Injectable } from '@nestjs/common'

import { BaseService } from '../base/base.service'
import type { BaseUserInfo, GoogleProfile, ProviderOptions } from '../interfaces'
import { AllowedProvider } from '../enums'

@Injectable()
export class TelegramProvider extends BaseService {
       public constructor(options: ProviderOptions) {
              super({
                     name: AllowedProvider.TELEGRAM,
                     authorizeUrl: 'https://oauth.telegram.org/auth',
                     accessUrl: 'https://oauth.telegram.org/token',
                     profileUrl: '',
                     scopes: options.scopes,
                     clientId: options.clientId,
                     clientSecret: options.clientSecret,
              })
       }

       public async extractUserInfo(data: GoogleProfile): Promise<BaseUserInfo> {
              return super.extractUserInfo({
                     id: data.sub,
                     username: data.preferred_username,
                     name: data.name,
                     firstName: data.given_name,
                     lastName: data.family_name,
                     avatar: data.picture,
                     phone: data.phone_number,
              })
       }
}