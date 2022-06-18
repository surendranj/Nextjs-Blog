import { Box, IconButton } from "@mui/material";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
// import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";

const Bookmark = () => {
    return (
        <Box>
            <IconButton>
                <BookmarkAddOutlinedIcon color="action" />
            </IconButton>
            {/* <IconButton>
                <BookmarkAddedOutlinedIcon />
            </IconButton> */}
        </Box>
    );
};

export default Bookmark;
