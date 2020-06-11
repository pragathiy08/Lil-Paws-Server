import { Router } from "express";
import graphqlHTTP from 'express-graphql';
import { AccountGraph } from "../models/Account";
import { GraphQLSchema, GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";
import { RoleGraph } from "../models/Role";
import { createAccount } from "../resolvers/AccountHelpers";

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
                }
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
                    email: { type: new GraphQLNonNull(GraphQLString) },
                    password: { type: new GraphQLNonNull(GraphQLString) },
                    role: { type: new GraphQLNonNull(RoleGraph) }
                },
                resolve: createAccount
            }
        }
    })
});

router.use("/", graphqlHTTP({
    schema: schema,
    graphiql: true
}));

export default router;