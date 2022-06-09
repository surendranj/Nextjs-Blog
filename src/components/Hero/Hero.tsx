import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";

const Hero = () => {
    return (
        <Box sx={{ height: "30vh", position: "relative" }}>
            <Image src="https://source.unsplash.com/Lki74Jj7H-U" alt="Hero Image" layout="fill" objectFit="cover" />
        </Box>
    );
};

export default Hero;
