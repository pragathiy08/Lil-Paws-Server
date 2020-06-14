import { Account, AccountModel } from "../models/Account";
import { Request } from "express";
import { GraphQLResolveInfo } from "graphql";
import { hash, compare } from 'bcryptjs';
import { Role } from "../models/Role";
import { signAuthToken, verifyAuthToken } from "../helpers/AuthToken";



/**
 * Interface for Create Resolver args
 */
interface CreateResolverArgs {
    _id: string;
    email: string;
    password?: string;
    role: Role
}

/**
 * Resolver function for mutation *create*
 * @returns Promise containing Account
 */
export function create(_source: any, args: CreateResolverArgs, _context: Request, _info: GraphQLResolveInfo): Promise<Account> {
    return new Promise(async (resolve, reject) => {
        try {

            const { _id, email, password, role } = args;

            const usernameExists = await AccountModel.exists({ _id: _id });
            if (usernameExists) throw new Error("Username already taken");

            const account = new AccountModel();
            
            account._id = _id;
            account.email = email;
            account.role = role;

            if (args.password) {
                account.password = await hash(args.password, 9);
            }

            const document = await account.save();

            resolve(document);
            
        } catch (error) {

            console.error(error);
            reject(error);

        }
    });
}



/**
 * Interface for Fetch resolver args
 */
interface FetchResolverArgs {
    username?: string;
}

/**
 * Resolver function for query *fetch*
 * @returns Promise containing Account
 */
export function fetch(_source: any, args: FetchResolverArgs, context: Request, _info: GraphQLResolveInfo): Promise<Account> {
    return new Promise((resolve, reject) => {
        try {

            const token = verifyAuthToken(context);

            console.log(token);

            resolve();
            
        } catch (error) {
            
            console.error(error);
            reject(error);

        }
    })
}



/**
 * Interface for Login args
 */
interface LoginResolverArgs {
    username: string;
    password?: string;
}

/**
 * Resolver function for query *login*
 * @returns Promise containing string (token)
 */
export function login(_source: any, args: LoginResolverArgs, _context: Request, _info: GraphQLResolveInfo): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {

            // Check if account exists
            const accountExists = await AccountModel.exists({ _id: args.username });

            // Throw error if it doesn't
            if (accountExists === false) throw new Error("Accout doesn't exist");

            // Get account document
            const account = await AccountModel.findById(args.username);
            
            // Check if is password protected
            const isPasswordProtected = Boolean(account.password);

            // Variable to hold auth token
            let token: string;

            // Sign Auth token
            if (account.password) {
                // Check for password match
                const isPasswordMatching = await compare(args.password, account.password);

                // Throw Error if password isn't matching
                if (isPasswordMatching === false) throw new Error("Password incorrect");

                // Sign token for password match
                token = signAuthToken(account);
            
            } else {
                // Sign token directly without password
                token = signAuthToken(account);
            }

            // Resolve Promise with token
            resolve(token);
            
        } catch (error) {
            
            console.error(error);
            reject(error);

        }
    })
}