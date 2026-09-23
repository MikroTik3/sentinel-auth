import type { BaseProviderOptions, BaseUserInfo } from '../interfaces';
export declare class BaseService {
    private readonly options;
    private _baseUrl;
    constructor(options: BaseProviderOptions);
    protected extractUserInfo(data: any, accessToken?: string): Promise<BaseUserInfo>;
    getAuthUrl(state?: string): string;
    getUserByCode(code: string): Promise<BaseUserInfo>;
    getRedirectUrl(): string;
    set baseUrl(value: string);
    get name(): import("..").AllowedProvider;
    get accessUrl(): string;
    get profileUrl(): string;
    get scopes(): string[];
}
