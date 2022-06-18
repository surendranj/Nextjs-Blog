import { Grid } from "@mui/material";
import PostCard from "./Post/PostCard";
import { useQuery } from "react-query";
import { getPosts } from "../../../pages";
import { PostTag } from "../../graphql/generated";

type Post = {
    id: string;
    createdAt: any;
    title: string;
    postImage: string;
    tag: PostTag[];
    content: { text: string };
    author?: { name: string; image?: string | null } | null;
};
const Posts = () => {
    const { data } = useQuery("posts", getPosts);

    return (
        <Grid container columnSpacing={4} rowSpacing={2} paddingBottom={10} paddingTop={5}>
            {data?.posts.map((post: Post) => {
                return (
                    <Grid key={post.id} item xs={12} sm={6} md={4}>
                        <PostCard {...post} />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default Posts;
