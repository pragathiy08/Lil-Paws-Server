import { GraphQLEnumType } from "graphql";


/**
 * Enum for *Role*
 */
export enum Role {
    ADMIN, GENERAL
}


/**
 * GraphQL Enum Object for *Role*
 */
export const RoleGraph = new GraphQLEnumType({
    name: "Role",
    description: "Enum for Role",
    values: {
        ADMIN: { value: 0, description: "Admin Role" },
        GENERAL: { value: 1, description: "General Role" }
    }
});