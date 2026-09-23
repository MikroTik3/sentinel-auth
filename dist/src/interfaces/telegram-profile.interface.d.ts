export interface TelegramProfile {
    iss: string;
    aud: string;
    sub: string;
    iat: number;
    exp: number;
    id: number;
    name: string;
    given_name: string;
    family_name: string;
    preferred_username: string;
    picture: string;
    phone_number?: string;
    phone_number_verified?: boolean;
}
