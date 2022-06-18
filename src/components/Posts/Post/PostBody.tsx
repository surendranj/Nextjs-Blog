import React from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import { GetPostQuery } from "../../../graphql/generated";
import parse from "html-react-parser";

const PostBody = ({ data }: { data: GetPostQuery | undefined }) => {
    const root = parse(data?.post?.content.html || "");
    return (
        <Box>
            <Typography component="h1" variant="h4" gutterBottom={true}>
                {data?.post?.title}
            </Typography>

            <CardMedia component="img" src={data?.post?.postImage || ""} alt="Post Image" />
            <Box>{root}</Box>
        </Box>
    );
};

export default PostBody;
