import { createTheme } from "@mui/material";

const theme = createTheme({
    components: {
        MuiContainer: {
            defaultProps: {
                maxWidth: "lg",
            },
        },
    },
});

export default theme;
