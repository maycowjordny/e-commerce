import { AuthPayload } from '@/interfaces/pay-load';
import { decode } from 'jsonwebtoken';

export function jwtDecode(token: string | undefined) {
    if (!token) return null
    return decode(token) as AuthPayload;
}
