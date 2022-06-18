import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";

const Update = () => {
    const router = useRouter();
    return (
        <Box>
            <Tooltip title="Edit Post">
                <IconButton onClick={() => router.push(`/post/edit-post/${router.query.postId}`)}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default Update;
