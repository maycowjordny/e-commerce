export interface AuthPayload {
    sub?: string;
    email?: string;
    isAdmin?: boolean
    name?: string;
    iat?: number;
    exp?: number;
}