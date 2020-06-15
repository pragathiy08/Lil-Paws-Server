import { Router } from "express";
import graphqlHTTP from 'express-graphql';
import { AccountGraph } from "../models/Account";
import { GraphQLSchema, GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";
import { RoleGraph } from "../models/Role";
import { create, login, fetch } from "../resolvers/AccountResolvers";

const router = Router()

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            login: {
                type: GraphQLString,
                args: {
                    username: { type: new GraphQLNonNull(GraphQLString) },
                    password: { type: GraphQLString }
                },
                resolve: login
            },
            fetch: {
                type: AccountGraph,
                args: {
                    username: { type: GraphQLString }
                },
                resolve: fetch
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: {
            create: {
                type: AccountGraph,
                description: "Creates Account",
                args: {
                    _id: { type: new GraphQLNonNull(GraphQLString) },
                    name: { type: new GraphQLNonNull(GraphQLString) },
                    email: { type: new GraphQLNonNull(GraphQLString) },
                    password: { type: new GraphQLNonNull(GraphQLString) },
                    role: { type: new GraphQLNonNull(RoleGraph) }
                },
                resolve: create
            }
        }
    })
});

router.use("/", graphqlHTTP({
    schema: schema,
    graphiql: true // To be removed or made false during production
}));

export default router;