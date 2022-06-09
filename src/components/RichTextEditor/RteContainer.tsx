import React from "react";
import { Box, Divider } from "@mui/material";
import RteToolbar from "./RteToolbar/RteToolbar";

const RteContainer = ({ children }: { children?: React.ReactNode }) => {
    return (
        <Box
            sx={{
                border: 1,
                borderRadius: 1,
                borderColor: "grey.400",
                "&:hover": { borderColor: "black" },
                "&:focus-within": { borderColor: "black" },
            }}
        >
            <RteToolbar />
            <Divider />
            {children}
        </Box>
    );
};

export default RteContainer;
