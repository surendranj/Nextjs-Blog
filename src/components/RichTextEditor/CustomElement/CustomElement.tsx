import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { RenderElementProps, RenderLeafProps } from "slate-react";

const Element = ({ attributes, children, element }: RenderElementProps) => {
    const textAlign = element.align || "unset";
    switch (element.type) {
        case "block-quote":
            return (
                <Box
                    component="blockquote"
                    sx={{
                        textAlign,
                        borderLeft: 2,
                        borderColor: grey["400"],
                        marginLeft: 2,
                        paddingX: 1,
                    }}
                    {...attributes}
                >
                    {children}
                </Box>
            );
        case "bulleted-list":
            return (
                <Box component="ul" sx={{ textAlign }} {...attributes}>
                    {children}
                </Box>
            );
        case "heading-one":
            return (
                <Typography component="h1" variant="h3" gutterBottom={true} sx={{ textAlign }} {...attributes}>
                    {children}
                </Typography>
            );
        case "heading-two":
            return (
                <Typography component="h2" variant="h4" gutterBottom={true} sx={{ textAlign }} {...attributes}>
                    {children}
                </Typography>
            );
        case "heading-three":
            return (
                <Typography component="h3" variant="h5" gutterBottom={true} sx={{ textAlign }} {...attributes}>
                    {children}
                </Typography>
            );
        case "list-item":
            return (
                <Box component="li" sx={{ textAlign }} {...attributes}>
                    {children}
                </Box>
            );
        case "numbered-list":
            return (
                <Box component="ol" sx={{ textAlign }} {...attributes}>
                    {children}
                </Box>
            );
        case "code":
            return (
                <Box sx={{ textAlign, backgroundColor: grey["300"] }} {...attributes}>
                    <Box component="code">{children}</Box>
                </Box>
            );

        default:
            return (
                <Typography component="p" variant="body1" sx={{ textAlign }} {...attributes}>
                    {children}
                </Typography>
            );
    }
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

export { Element, Leaf };
