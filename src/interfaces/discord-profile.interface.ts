export interface DiscordAvatarDecorationData {
       sku_id: string;
       asset: string;
}
export interface DiscordCollectibleItem {
       sku_id: string;
       asset: string;
       label: string;
       palette: string;
}
export interface DiscordCollectibles {
       nameplate?: DiscordCollectibleItem;
       [key: string]: DiscordCollectibleItem | undefined;
}
export interface DiscordPrimaryGuild {
       identity_guild_id: string;
       identity_enabled: boolean;
       tag: string;
       badge: string;
}

export interface DiscordProfile {
       id: string;
       username: string;
       discriminator: string;
       global_name?: string | null;
       avatar?: string | null;
       bot?: boolean;
       system?: boolean;
       mfa_enabled?: boolean;
       banner?: string | null;
       accent_color?: number | null;
       locale?: string;
       verified?: boolean;
       email?: string | null;
       flags?: number;
       premium_type?: number;
       public_flags?: number;
       avatar_decoration_data?: DiscordAvatarDecorationData | null;
       collectibles?: DiscordCollectibles | null;
       primary_guild?: DiscordPrimaryGuild | null;
}