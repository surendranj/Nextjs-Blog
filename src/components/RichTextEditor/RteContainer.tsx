import React from "react";
import { Box } from "@mui/material";

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
            {/* <RteToolbar/> */}
            {children}
        </Box>
    );
};

export default RteContainer;
