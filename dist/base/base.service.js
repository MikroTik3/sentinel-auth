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
exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
let BaseService = class BaseService {
    constructor(options) {
        this.options = options;
    }
    async extractUserInfo(data, accessToken) {
        return Object.assign(Object.assign({}, data), { provider: this.options.name });
    }
    getAuthUrl(state) {
        var _a;
        const query = new URLSearchParams({
            response_type: 'code',
            client_id: this.options.clientId,
            redirect_uri: this.getRedirectUrl(),
            scope: ((_a = this.options.scopes) !== null && _a !== void 0 ? _a : []).join(' '),
            state: state !== null && state !== void 0 ? state : ''
        });
        return `${this.options.authorizeUrl}?${query}`;
    }
    async getUserByCode(code) {
        const clientId = this.options.clientId;
        const clientSecret = this.options.clientSecret;
        const tokensQuery = new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            code,
            redirect_uri: this.getRedirectUrl(),
            grant_type: 'authorization_code'
        });
        const tokensRequest = await fetch(this.options.accessUrl, {
            method: 'POST',
            body: tokensQuery,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json'
            }
        });
        if (!tokensRequest.ok) {
            throw new common_1.BadRequestException(`Failed to fetch tokens from ${this.options.accessUrl}`);
        }
        const tokens = await tokensRequest.json();
        if (!tokens.access_token) {
            throw new common_1.BadRequestException(`No tokens ${this.options.accessUrl}`);
        }
        const userRequest = await fetch(this.options.profileUrl, {
            headers: {
                Authorization: `Bearer ${tokens.access_token}`
            }
        });
        if (!userRequest.ok) {
            throw new common_1.BadRequestException(`Failed to fetch user from ${this.options.profileUrl}`);
        }
        const user = await userRequest.json();
        const userData = await this.extractUserInfo(user);
        return Object.assign(Object.assign({}, userData), { accessToken: tokens.access_token, refreshToken: tokens.refresh_token, expiry: tokens.expiresAt || tokens.expires_in, provider: this.options.name });
    }
    getRedirectUrl() {
        return `${this._baseUrl}/auth/sso/callback/${this.options.name}`;
    }
    set baseUrl(value) {
        this._baseUrl = value;
    }
    get name() {
        return this.options.name;
    }
    get accessUrl() {
        return this.options.accessUrl;
    }
    get profileUrl() {
        return this.options.profileUrl;
    }
    get scopes() {
        return this.options.scopes;
    }
};
exports.BaseService = BaseService;
exports.BaseService = BaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], BaseService);
//# sourceMappingURL=base.service.js.map