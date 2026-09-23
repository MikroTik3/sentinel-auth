import { BaseService } from '../base/base.service';
import type { BaseUserInfo, GithubProfile, ProviderOptions } from '../interfaces';
export declare class GithubProvider extends BaseService {
    constructor(options: ProviderOptions);
    extractUserInfo(data: GithubProfile, accessToken: string): Promise<BaseUserInfo>;
}
