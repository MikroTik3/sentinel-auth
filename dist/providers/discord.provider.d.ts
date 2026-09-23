import { BaseService } from '../base/base.service';
import type { BaseUserInfo, DiscordProfile, ProviderOptions } from '../interfaces';
export declare class DiscordProvider extends BaseService {
    constructor(options: ProviderOptions);
    extractUserInfo(data: DiscordProfile): Promise<BaseUserInfo>;
}
