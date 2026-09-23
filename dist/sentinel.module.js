"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SentinelModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentinelModule = void 0;
const common_1 = require("@nestjs/common");
const sentinel_service_1 = require("./sentinel.service");
let SentinelModule = SentinelModule_1 = class SentinelModule {
    static forRoot(options) {
        return {
            module: SentinelModule_1,
            providers: [
                {
                    provide: 'SENTINEL_OPTIONS',
                    useValue: options
                },
                sentinel_service_1.SentinelService
            ],
            exports: [sentinel_service_1.SentinelService]
        };
    }
    static forRootAsync(options) {
        return {
            module: SentinelModule_1,
            imports: options.imports ? options.imports.map((m) => (0, common_1.forwardRef)(() => m)) : [],
            providers: [
                {
                    provide: 'SENTINEL_OPTIONS',
                    useFactory: options.useFactory,
                    inject: options.inject || []
                },
                sentinel_service_1.SentinelService
            ],
            exports: [sentinel_service_1.SentinelService]
        };
    }
};
exports.SentinelModule = SentinelModule;
exports.SentinelModule = SentinelModule = SentinelModule_1 = __decorate([
    (0, common_1.Module)({})
], SentinelModule);
//# sourceMappingURL=sentinel.module.js.map