import { Inject, Injectable, type OnModuleInit } from '@nestjs/common'

import { BaseService } from './base/base.service'
import { SentinelOptions } from './interfaces'

@Injectable()
export class SentinelService implements OnModuleInit {
	public constructor(
		@Inject('SENTINEL_OPTIONS')
		private readonly options: SentinelOptions
	) {}

	public onModuleInit() {
		for (const provider of this.options.services) {
			provider.baseUrl = this.options.baseUrl
		}
	}

	public findService(service: string): BaseService | null {
		return this.options.services.find(s => s.name === service) ?? null
	}
}