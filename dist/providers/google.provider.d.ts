import { BaseService } from '../base/base.service';
import type { BaseUserInfo, GoogleProfile, ProviderOptions } from '../interfaces';
export declare class GoogleProvider extends BaseService {
    constructor(options: ProviderOptions);
    extractUserInfo(data: GoogleProfile): Promise<BaseUserInfo>;
}
