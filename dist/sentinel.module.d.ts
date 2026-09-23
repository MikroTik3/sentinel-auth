import { DynamicModule } from '@nestjs/common';
import { SentinelOptions, SentinelAsyncOptions } from './interfaces';
export declare class SentinelModule {
    static forRoot(options: SentinelOptions): DynamicModule;
    static forRootAsync(options: SentinelAsyncOptions): DynamicModule;
}
