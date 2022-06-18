import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useDeletePostMutation } from "../../graphql/generated";
import { client } from "../../graphql/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const DeletePost = () => {
    const router = useRouter();
    const postId = router.query.postId as string;
    const mutation = useDeletePostMutation(client);
    const handleClick = () => {
        mutation.mutate({ id: postId });
    };
    useEffect(() => {
        if (mutation.isSuccess) {
            router.push("/");
        }
    });

    return (
        <Box>
            <Tooltip title="Delete Post">
                <IconButton disabled={mutation.isLoading} onClick={handleClick}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default DeletePost;
