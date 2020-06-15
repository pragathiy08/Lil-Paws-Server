import { sign, verify } from 'jsonwebtoken';
import { Account } from '../models/Account';
import { Request, Response, NextFunction } from 'express';
import PawRequest from './PawRequest';

export function signAuthToken(account: Account): string {
    const { _id } = account;
    const token = sign({ _id: _id }, process.env.SECRET);
    return token;
}

export function verifyAuthToken({ headers: { access_token } }: Request): string {
    if (Boolean(access_token)) {
        const token = access_token.toString();
        const { _id } = verify(token, process.env.SECRET) as { _id: string, iat: number };
        return _id;
    } else {
        throw new Error("No Authentication Token");
    }
}

export function accessTokenParser(request: PawRequest, _response: Response, next: NextFunction): void {
    try {
        const _id = verifyAuthToken(request);
        request['username'] = _id;
    } catch (error) {
        console.error(error);
    }
    next();
}