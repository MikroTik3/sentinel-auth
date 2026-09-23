import type { FactoryProvider, ModuleMetadata } from "@nestjs/common";
import { BaseService } from '../base';
export declare const SentinelOptionsSymbol: unique symbol;
export type SentinelOptions = {
    baseUrl: string;
    redirectUrl?: string;
    services: BaseService[];
};
export type SentinelAsyncOptions = Pick<ModuleMetadata, 'imports'> & Pick<FactoryProvider<SentinelOptions>, 'useFactory' | 'inject'>;
