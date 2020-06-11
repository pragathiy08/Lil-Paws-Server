import { Schema, model, Document } from "mongoose";
import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";


export interface Account extends Document {
    _id: string;
    email: string;
    password?: string;
    date: Date;
}

export const AccountSchema = new Schema<Account>({
    _id: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    date: { type: Date, default: Date.now }
})

export const AccountModel = model<Account>("Account", AccountSchema)

export const AccountGraph = new GraphQLObjectType({
    name: "Account",
    fields: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLString() },
        date: { type: new GraphQLString() }
    }
})