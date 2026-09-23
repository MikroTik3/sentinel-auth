import { type OnModuleInit } from '@nestjs/common';
import { BaseService } from './base/base.service';
import { SentinelOptions } from './interfaces';
export declare class SentinelService implements OnModuleInit {
    private readonly options;
    constructor(options: SentinelOptions);
    onModuleInit(): void;
    findService(service: string): BaseService | null;
}
