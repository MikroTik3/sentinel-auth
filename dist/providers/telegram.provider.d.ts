import { BaseService } from '../base/base.service';
import type { BaseUserInfo, ProviderOptions } from '../interfaces';
import type { TelegramProfile } from '../interfaces/telegram-profile.interface';
export declare class TelegramProvider extends BaseService {
    private readonly telegramOptions;
    private readonly jwks;
    constructor(telegramOptions: ProviderOptions);
    extractUserInfo(data: TelegramProfile): Promise<BaseUserInfo>;
    getUserByCode(code: string): Promise<BaseUserInfo>;
    private verifyIdToken;
}
