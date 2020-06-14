import { sign, verify } from 'jsonwebtoken';
import { Account } from '../models/Account';
import { Request } from 'express';

export function signAuthToken(account: Account): string {
    const { _id } = account;
    const token = sign({ _id: _id }, process.env.SECRET);
    return token;
}

export function verifyAuthToken({ headers: { access_token } }: Request): string {
    if (Boolean(access_token)) {
        const token = access_token.toString();
        const _id = verify(token, process.env.SECRET);
        return _id.toString();
    } else {
        throw new Error("No Authentication Token");
    }
}