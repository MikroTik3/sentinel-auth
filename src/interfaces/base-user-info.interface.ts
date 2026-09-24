export interface BaseUserInfo {
       id: string
       name: string
       username: string
       email: string
       avatar: string
       accessToken?: string | null
       refreshToken?: string
       expiry?: number
       provider: string
}