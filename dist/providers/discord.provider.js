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
exports.DiscordProvider = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../base/base.service");
const enums_1 = require("../enums");
let DiscordProvider = class DiscordProvider extends base_service_1.BaseService {
    constructor(options) {
        super({
            name: enums_1.AllowedProvider.DISCORD,
            authorizeUrl: 'https://discord.com/oauth2/authorize?prompt=consent',
            accessUrl: 'https://discord.com/api/v10/oauth2/token',
            profileUrl: 'https://discord.com/api/v10/users/@me',
            scopes: options.scopes,
            clientId: options.clientId,
            clientSecret: options.clientSecret,
        });
    }
    async extractUserInfo(data) {
        var _a, _b;
        return super.extractUserInfo({
            id: data.id,
            name: (_a = data.global_name) !== null && _a !== void 0 ? _a : data.username,
            email: (_b = data.email) !== null && _b !== void 0 ? _b : null,
            avatar: data.avatar
                ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
                : null,
        });
    }
};
exports.DiscordProvider = DiscordProvider;
exports.DiscordProvider = DiscordProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], DiscordProvider);
//# sourceMappingURL=discord.provider.js.map