import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { dehydrate, QueryClient } from "react-query";
import Post from "../../../src/components/Posts/Post/Post";
import { client } from "../../../src/graphql/client";
import { GetPostDocument, GetPostIdsDocument } from "../../../src/graphql/generated";

const PostPage: NextPage = () => {
    return <Post />;
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { postIds } = await client.request(GetPostIdsDocument);

    const paths = postIds.map((data: { id: string }) => {
        return {
            params: {
                postId: data.id,
            },
        };
    });

    return {
        paths,
        fallback: false,
    };
};

export const getPost = async (id: string | string[] | undefined) => {
    return await client.request(GetPostDocument, { where: { id } });
};
export const getStaticProps: GetStaticProps = async (context: any) => {
    const { params } = context;

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery("post", () => getPost(params.postId));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 60 * 5,
    };
};

export default PostPage;
