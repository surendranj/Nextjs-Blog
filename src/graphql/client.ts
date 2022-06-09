import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT, {
    headers: {
        Authorization: process.env.GRAPHCMS_TOKEN,
    },
});
