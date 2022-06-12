import { Box, Typography } from "@mui/material";
import { RenderElementProps, RenderLeafProps } from "slate-react";

const CodeElement = (props: RenderElementProps) => {
    return (
        <Box component="pre" {...props.attributes}>
            <Box component="code">{props.children}</Box>
        </Box>
    );
};

const DefaultElement = (props: RenderElementProps) => {
    return (
        <Typography paragraph={true} {...props.attributes}>
            {props.children}
        </Typography>
    );
};

const Leaf = (props: RenderLeafProps) => {
    return (
        <Box
            component="span"
            {...props.attributes}
            sx={{
                fontWeight: props.leaf.bold ? 700 : 400,
                fontStyle: props.leaf.italic ? "italic" : "normal",
                textDecoration: props.leaf.underline ? "underline" : "none",
            }}
        >
            {props.children}
        </Box>
    );
};

export { CodeElement, DefaultElement, Leaf };
