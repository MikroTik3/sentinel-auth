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
exports.TelegramProvider = void 0;
const common_1 = require("@nestjs/common");
const jose_1 = require("jose");
const base_service_1 = require("../base/base.service");
const enums_1 = require("../enums");
let TelegramProvider = class TelegramProvider extends base_service_1.BaseService {
    constructor(telegramOptions) {
        var _a;
        super({
            name: enums_1.AllowedProvider.TELEGRAM,
            authorizeUrl: 'https://oauth.telegram.org/auth',
            accessUrl: 'https://oauth.telegram.org/token',
            profileUrl: '',
            scopes: ((_a = telegramOptions.scopes) === null || _a === void 0 ? void 0 : _a.length) ? telegramOptions.scopes : ['openid', 'profile'],
            clientId: telegramOptions.clientId,
            clientSecret: telegramOptions.clientSecret
        });
        this.telegramOptions = telegramOptions;
        this.jwks = (0, jose_1.createRemoteJWKSet)(new URL('https://oauth.telegram.org/.well-known/jwks.json'));
    }
    async extractUserInfo(data) {
        return super.extractUserInfo({
            id: String(data.id),
            username: data.preferred_username,
            name: data.name,
            firstName: data.given_name,
            lastName: data.family_name,
            avatar: data.picture,
            phone: data.phone_number
        });
    }
    async getUserByCode(code) {
        const credentials = Buffer.from(`${this.telegramOptions.clientId}:${this.telegramOptions.clientSecret}`).toString('base64');
        const tokensQuery = new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: this.getRedirectUrl(),
            client_id: this.telegramOptions.clientId
        });
        const tokensRequest = await fetch(this.accessUrl, {
            method: 'POST',
            body: tokensQuery,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json',
                Authorization: `Basic ${credentials}`
            }
        });
        if (!tokensRequest.ok) {
            throw new common_1.BadRequestException(`Failed to fetch tokens from ${this.accessUrl}`);
        }
        const tokens = await tokensRequest.json();
        if (!tokens.id_token) {
            throw new common_1.BadRequestException('No id_token in Telegram response');
        }
        const claims = await this.verifyIdToken(tokens.id_token);
        const userData = await this.extractUserInfo(claims);
        return Object.assign(Object.assign({}, userData), { accessToken: tokens.access_token, refreshToken: tokens.refresh_token, expiry: tokens.expires_in, provider: this.name });
    }
    async verifyIdToken(idToken) {
        const { payload } = await (0, jose_1.jwtVerify)(idToken, this.jwks, {
            issuer: 'https://oauth.telegram.org',
            audience: this.telegramOptions.clientId
        });
        return payload;
    }
};
exports.TelegramProvider = TelegramProvider;
exports.TelegramProvider = TelegramProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], TelegramProvider);
//# sourceMappingURL=telegram.provider.js.map