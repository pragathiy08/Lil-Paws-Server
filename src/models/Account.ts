import { Schema, model, Document } from "mongoose";
import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInputObjectType } from "graphql";
import { Role, RoleGraph } from "./Role";


/**
 * Interface for *Accounts*
 */
export interface Account extends Document {
    _id: string;
    name: string;
    email: string;
    password?: string;
    role: Role;
    date: Date;
}


/**
 * Mongoose Schema for *Accounts*
 */
export const AccountSchema = new Schema<Account>({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    role: { type: Number, default: 1 },
    date: { type: Date, default: Date.now }
});


/**
 * Mongoose Model for *Accounts*
 */
export const AccountModel = model<Account>("accounts", AccountSchema);


/**
 * GraphQL Object for *Accounts*
 */
export const AccountGraph = new GraphQLObjectType({
    name: "Account",
    description: "GraphQL Object for Accounts",
    fields: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLString },
        role: { type: new GraphQLNonNull(RoleGraph) },
        date: { type: GraphQLString }
    }
});