import { Schema, model, Document } from "mongoose";
import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } from "graphql";


/**
 * Interface for *Pet*
 */
export interface Pet extends Document {
    variant: string;
    breed: string;
    name: string;
    age: number;
    owner: string;
    date: Date;
}


/**
 * Mongoose Schema for *Pet*
 */
export const PetSchema = new Schema<Pet>({
    variant: { type: String, required: true },
    breed: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    owner: { type: String, required: true },
    date: { type: Date, default: Date.now }
});


/**
 * Mongoose Model for *Pet*
 */
export const PetModel = model<Pet>("pets", PetSchema);


/**
 * GraphQL Object for *Accounts*
 */
export const PetGraph = new GraphQLObjectType({
    name: "Pet",
    description: "GraphQL Object for Pet",
    fields: {
        variant: { type: new GraphQLNonNull(GraphQLString) },
        breed: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        owner: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) }
    }
});


/**
 * GraphQL Input Object for *Accounts*
 */
export const PetInputGraph = new GraphQLObjectType({
    name: "PetInput",
    description: "GraphQL Input Object for Pet",
    fields: {
        variant: { type: new GraphQLNonNull(GraphQLString) },
        breed: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        owner: { type: new GraphQLNonNull(GraphQLString) }
    }
});