import { GraphQLResolveInfo } from "graphql";
import { Pet, PetModel } from "../models/Pet";
import PawRequest from "../helpers/PawRequest";



/**
 * Interface for Insert resolver args
 */
interface InsertResolverArgs {
    variant: string;
    breed: string;
    name: string;
    birth: Date;
}

/**
 * Resolver function for query *insert*
 * @returns Promise containing Pet
 */
export function insert(_source: any, args: InsertResolverArgs, context: PawRequest, _info: GraphQLResolveInfo): Promise<Pet> {
    return new Promise(async (resolve, reject) => {
        try {

            const isLoggedIn = !!context.username;

            if (!isLoggedIn) throw new Error("You must be logged in");

            const { variant, breed, name, birth } = args;

            const pet = new PetModel();
            pet.variant = variant;
            pet.breed = breed;
            pet.name = name;
            pet.birth = new Date(birth);
            pet.owner = context.username;

            const document = await pet.save();

            resolve(document);

        } catch (error) {
            console.error(error);
            reject(error);
        }
    })
}



/**
 * Interface for Remove resolver args
 */
interface RemoveResolverArgs {
    _id: string;
}

/**
 * Resolver function for query *remove*
 * @returns Promise containing Pet
 */
export function remove(_source: any, args: RemoveResolverArgs, context: PawRequest, _info: GraphQLResolveInfo): Promise<Pet> {
    return new Promise(async (resolve, reject) => {
        try {

            const isLoggedIn = !!context.username;

            if (!isLoggedIn) throw new Error("You must be logged in");

            const { _id } = args;

            const pet = await PetModel.findById(_id);

            if (context.username !== pet.owner) throw new Error("Not your pet");

            const document = await pet.remove();

            resolve(document);

        } catch (error) {
            console.error(error);
            reject(error);
        }
    })
}



/**
 * Interface for Remove resolver args
 */
interface FetchResolverArgs {
    _id: string;
}

/**
* Resolver function for query *fetch*
* @returns Promise containing Pet
*/
export function fetch(_source: any, args: FetchResolverArgs, context: PawRequest, _info: GraphQLResolveInfo): Promise<Pet> {
    return new Promise(async (resolve, reject) => {
        try {

            const { _id } = args;

            const isPetExists = await PetModel.exists({ _id: _id });

            if (!isPetExists) throw new Error("Pet doesn't exist");

            const pet = await PetModel.findById(_id);

            resolve(pet);

        } catch (error) {
            console.error(error);
            reject(error);
        }
    })
}



/**
 * Interface for Search resolver args
 */
interface SearchResolverArgs {
    variant?: string;
    breed?: string;
    name?: string;
    owner?: string;
}

/**
* Resolver function for query *search*
* @returns Promise containing list of Pet
*/
export function search(_source: any, args: SearchResolverArgs, context: PawRequest, _info: GraphQLResolveInfo): Promise<Pet[]> {
    return new Promise(async (resolve, reject) => {
        try {

            const isLoggedIn = !!context.username;

            if (!isLoggedIn) throw new Error("You must be logged in");

            const { variant, breed, name, owner } = args;

            const pets = await PetModel.find({
                $and: [
                    { variant: new RegExp(variant, "i") },
                    { breed: new RegExp(breed, "i") },
                    { name: new RegExp(name, "i") },
                    { owner: new RegExp(owner, "i") }
                ]
            });

            resolve(pets);

        } catch (error) {
            console.error(error);
            reject(error);
        }
    })
}