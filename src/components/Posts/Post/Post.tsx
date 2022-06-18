import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getPost } from "../../../../pages/post/[postId]";

import PostBody from "./PostBody";
import PostHeader from "./PostHeader";

const Post = () => {
    const router = useRouter();
    const postId = router.query.postId;
    const { data } = useQuery("post", () => getPost(postId));

    return (
        <Container sx={{ marginY: 10 }}>
            <PostHeader data={data} />
            <PostBody data={data} />
        </Container>
    );
};

export default Post;
