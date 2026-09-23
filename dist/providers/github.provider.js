"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubProvider = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../base/base.service");
const enums_1 = require("../enums");
let GithubProvider = class GithubProvider extends base_service_1.BaseService {
    constructor(options) {
        super({
            name: enums_1.AllowedProvider.GITHUB,
            authorizeUrl: 'https://github.com/login/oauth/authorize',
            accessUrl: 'https://github.com/login/oauth/access_token',
            profileUrl: 'https://api.github.com/user',
            scopes: options.scopes,
            clientId: options.clientId,
            clientSecret: options.clientSecret
        });
    }
    async extractUserInfo(data, accessToken) {
        var _a;
        var _b;
        let email = '';
        if (accessToken) {
            const response = await fetch('https://api.github.com/user/emails', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: 'application/json'
                }
            });
            if (response.ok)
                throw new common_1.BadRequestException('Failed to fetch Github emails');
            const emails = await response.json();
            email = (_b = (_a = emails.find(e => e.primary && e.verified)) === null || _a === void 0 ? void 0 : _a.email) !== null && _b !== void 0 ? _b : '';
        }
        return super.extractUserInfo({
            id: data.id.toString(),
            name: data.name || data.login,
            email,
            avatar: data.avatar_url
        });
    }
};
exports.GithubProvider = GithubProvider;
exports.GithubProvider = GithubProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], GithubProvider);
//# sourceMappingURL=github.provider.js.map