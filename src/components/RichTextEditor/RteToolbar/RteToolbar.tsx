import { Toolbar } from "@mui/material";
import HeadingButtons from "./HeadingButtons";
import TextFormatButtons from "./TextFormatButtons";

// const NoOutlineSelect = styled(InputBase)(({ theme }) => ({
//     "& .MuiInputBase-input": {
//         padding: "8px",
//         height: "100%",
//     },
//     "&:hover": {
//         backgroundColor: theme.palette.grey["100"],
//         borderRadius: "4px",
//     },
// }));

const RteToolbar = () => {
    return (
        <Toolbar
            variant="dense"
            disableGutters={true}
            sx={{
                borderBottom: 1,
                borderColor: "grey.400",
            }}
        >
            {/* Select text type */}
            {/* <Select
                value={textType}
                onChange={handleChange}
                variant="standard"
                input={<NoOutlineSelect />}
                sx={{ marginX: "8px" }}
            >
                <MenuItem value="paragraph">Normal Text</MenuItem>
                <MenuItem value="heading-one">Heading 1</MenuItem>
            </Select> */}
            <HeadingButtons />
            <TextFormatButtons />
        </Toolbar>
    );
};

export default RteToolbar;
