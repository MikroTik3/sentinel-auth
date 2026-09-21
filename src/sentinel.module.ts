import { Module, DynamicModule, forwardRef } from '@nestjs/common'
import { SentinelService } from './sentinel.service'
import { SentinelOptions, SentinelAsyncOptions } from './interfaces'

@Module({})
export class SentinelModule {
	public static forRoot(options: SentinelOptions): DynamicModule {
		return {
			module: SentinelModule,
			providers: [
				{
					provide: 'SENTINEL_OPTIONS',
					useValue: options
				},
				SentinelService
			],
			exports: [SentinelService]
		}
	}

	public static forRootAsync(options: SentinelAsyncOptions): DynamicModule {
		return {
			module: SentinelModule,
			imports: options.imports ? options.imports.map((m) => forwardRef(() => m)) : [],
			providers: [
				{
					provide: 'SENTINEL_OPTIONS',
					useFactory: options.useFactory,
					inject: options.inject || []
				},
				SentinelService
			],
			exports: [SentinelService]
		}
	}
}
