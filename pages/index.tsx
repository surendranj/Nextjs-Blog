import { Box, Container } from "@mui/material";
import { NextPage } from "next";
import React from "react";
import { dehydrate, QueryClient } from "react-query";
import Hero from "../src/components/Hero/Hero";
import Posts from "../src/components/Posts/Posts";
import { client } from "../src/graphql/client";
import { GetPostsDocument } from "../src/graphql/generated";

const Home: NextPage = () => {
    return (
        <Box>
            <Hero />
            <Container>
                <Posts />
            </Container>
        </Box>
    );
};
export const getPosts = async () => {
    return await client.request(GetPostsDocument);
};

export async function getServerSideProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery("posts", getPosts);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}

export default Home;
