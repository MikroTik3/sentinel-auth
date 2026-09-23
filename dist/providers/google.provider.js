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
exports.GoogleProvider = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../base/base.service");
const enums_1 = require("../enums");
let GoogleProvider = class GoogleProvider extends base_service_1.BaseService {
    constructor(options) {
        super({
            name: enums_1.AllowedProvider.GOOGLE,
            authorizeUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
            accessUrl: 'https://oauth2.googleapis.com/token',
            profileUrl: 'https://www.googleapis.com/oauth2/v3/userinfo',
            scopes: options.scopes,
            clientId: options.clientId,
            clientSecret: options.clientSecret
        });
    }
    async extractUserInfo(data) {
        return super.extractUserInfo({
            id: data.sub,
            name: data.given_name,
            email: data.email,
            avatar: data.picture
        });
    }
};
exports.GoogleProvider = GoogleProvider;
exports.GoogleProvider = GoogleProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], GoogleProvider);
//# sourceMappingURL=google.provider.js.map