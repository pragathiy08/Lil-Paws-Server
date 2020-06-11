import { Schema, model, Document } from "mongoose";

export interface Pet extends Document{
    variant: string;
    breed: string;
    name: string;
    age: number;
    owner: string;
}

export const PetSchema = new Schema<Pet>({
    variant: { type: String, required: true },
    breed: { type: String, required: true },
    name: {type: String, required: true },
    age: { type: Number, required: true },
    owner: {type: String, required: true }
})

export const PetModel = model<Pet>("Pet", PetSchema)