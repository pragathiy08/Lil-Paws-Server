import { Router } from "express";
import graphqlHTTP from 'express-graphql';
import { AccountGraph } from "../models/Account";
import { GraphQLSchema, GraphQLObjectType } from "graphql";

const router = Router()

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: { }
    })
})

router.use("/", graphqlHTTP({
    schema: AccountGraph,

}))