import { Box } from "@mui/material";
import React from "react";
import Appbar from "../Appbar/Appbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box>
            <Appbar />
            {children}
        </Box>
    );
};

export default Layout;
