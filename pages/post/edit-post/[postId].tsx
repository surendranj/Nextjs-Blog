import { UserProfile, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import CreatePost from "../../../src/components/Posts/CreatePost";
import { getPost } from "../[postId]";

type ProfileProps = { user: UserProfile };

const EditPost = ({ user }: ProfileProps) => {
    const router = useRouter();
    const { data } = useQuery("post", () => getPost(router.query.postId));

    return <CreatePost data={data} />;
};

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async (context: any) => {
        const { params } = context;

        const queryClient = new QueryClient();
        await queryClient.prefetchQuery("editPost", () => getPost(params.postId));

        return {
            props: {
                dehydratedState: dehydrate(queryClient),
            },
        };
    },
});

export default EditPost;
