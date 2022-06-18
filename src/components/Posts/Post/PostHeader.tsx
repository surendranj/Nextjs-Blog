import { useUser } from "@auth0/nextjs-auth0";
import { Avatar, Box, Chip, Typography } from "@mui/material";
import { GetPostQuery } from "../../../graphql/generated";
import DeletePost from "../../Delete/DeletePost";
import UpdatePost from "../../Update/UpdatePost";

const PostHeader = ({ data }: { data: GetPostQuery | undefined }) => {
    const { user } = useUser();
    const date = new Date(data?.post?.createdAt);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const postDate = `${months[date.getMonth()]} ${date.getDay()}`;
    const titleLen = data?.post?.title.split(" ").length;
    const contentLen = data?.post?.content.html.split(" ").length;
    const readingTime = `${Math.round((contentLen! + titleLen!) / 200)} min read`;

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                {/* Avatar */}
                <Avatar alt={data?.post?.author?.name} src={data?.post?.author?.image || ""} />

                {/* Author name and follow button */}
                <Box>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "baseline" }}>
                        <Typography variant="body2">{data?.post?.author?.name}</Typography>
                        {false ? (
                            <Chip label={"Unfollow"} color={"primary"} size="small" />
                        ) : (
                            <Chip label={"Follow"} color={"success"} size="small" />
                        )}
                    </Box>
                    <Box component="span" sx={{ fontSize: 12, color: "grey.600" }}>
                        {postDate} &#183; {readingTime}
                    </Box>
                </Box>
            </Box>
            {user?.email === data?.post?.author?.email && (
                <Box sx={{ display: "fex" }}>
                    <UpdatePost />
                    <DeletePost />
                </Box>
            )}
        </Box>
    );
};

export default PostHeader;
