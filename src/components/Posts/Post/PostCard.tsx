import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Chip, Typography } from "@mui/material";
import Link from "next/link";
import { PostTag } from "../../../graphql/generated";

type PostCardProps = {
    author?: { name: string; image?: string | null } | null;
    createdAt: any;
    id: string;
    postImage: string;
    title: string;
    content: { text: string };
    tag: PostTag[];
};

const PostCard = ({ author, createdAt, id, postImage, title, content, tag }: PostCardProps) => {
    const date = new Date(createdAt);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const postDate = `${months[date.getMonth()]} ${date.getDay()}`;
    const titleLen = title.split(" ").length;
    const contentLen = content.text.split(" ").length;
    const readingTime = `${Math.round((contentLen + titleLen) / 200)} min read`;
    return (
        <Link href={`/post/${id}`}>
            <Card sx={{ cursor: "pointer" }}>
                <CardHeader
                    avatar={<Avatar alt={author?.name} src={author?.image || ""} />}
                    title={author?.name}
                    subheader={
                        <Box component="span" sx={{ fontSize: 12, color: "grey.600" }}>
                            {postDate} &#183; {readingTime}
                        </Box>
                    }
                />
                <CardMedia height={200} component="img" image={postImage} alt="Post Image" />
                <CardContent sx={{ height: 100 }}>
                    <Typography variant="h6" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom noWrap>
                        {content.text}
                    </Typography>
                </CardContent>
                <CardContent sx={{ display: "flex", columnGap: 1, paddingY: 0 }}>
                    {tag.map((tag) => (
                        <Chip key={tag} label={tag.replace("_", " ")} size="small" />
                    ))}
                </CardContent>
            </Card>
        </Link>
    );
};

export default PostCard;
