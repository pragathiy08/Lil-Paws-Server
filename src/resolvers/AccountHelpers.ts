import { Account, AccountModel } from "../models/Account";
import { Request } from "express";
import { GraphQLResolveInfo } from "graphql";

/**
 * Resolver function for query *create*
 */
export function createAccount(_source: any, args: Account, _context: Request, _info: GraphQLResolveInfo): Promise<Account> {
    
    return new Promise(async (resolve, reject) => {
        
        try {

            const { _id, email, password, role } = args;

            const usernameExists = await AccountModel.exists({ _id: _id });
            if (usernameExists) throw new Error("Username already taken");

            const account = new AccountModel();
            
            account._id = _id;
            account.email = email;
            account.password = password;
            account.role = role;

            const document = await account.save();

            resolve(document);
            
        } catch (error) {

            console.error(error);
            reject(error);

        }

    });

}