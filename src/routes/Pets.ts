import { Router } from "express";
import graphqlHTTP from 'express-graphql';
import { GraphQLSchema, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } from "graphql";
import { PetGraph } from "../models/Pet";
import { fetch, insert, remove, search } from "../resolvers/PetResolvers";

const router = Router()

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            fetch: {
                type: PetGraph,
                description: "Fetches pet given its _id",
                args: {
                    _id: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve: fetch
            },
            search: {
                type: new GraphQLList(PetGraph),
                description: "Fetches list of pets matching filters if given",
                args: {
                    variant: { type: GraphQLString },
                    breed: { type: GraphQLString },
                    name: { type: GraphQLString },
                    owner: { type: GraphQLString },
                },
                resolve: search
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: {
            add: {
                type: PetGraph,
                description: "Adds a pet",
                args: {
                    variant: { type: new GraphQLNonNull(GraphQLString) },
                    breed: { type: new GraphQLNonNull(GraphQLString) },
                    name: { type: new GraphQLNonNull(GraphQLString) },
                    birth: { type: new GraphQLNonNull(GraphQLString) },
                },
                resolve: insert
            },
            remove: {
                type: PetGraph,
                description: "Removes a pet",
                args: {
                    _id: { type: new GraphQLNonNull(GraphQLString) }
                },
                resolve: remove
            }
        }
    })
});

router.use("/", graphqlHTTP({
    schema: schema,
    graphiql: true // To be removed or made false during production
}));

export default router;