import { AllowedProvider } from "../enums";

export interface  BaseProviderOptions {
       name: AllowedProvider
       authorizeUrl: string
       accessUrl: string
       profileUrl: string
       scopes: string[]
       clientId: string
       clientSecret: string
}