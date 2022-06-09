import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import RteContainer from "../RichTextEditor/RteContainer";
import RichTextEditor from "../RichTextEditor/RichTextEditor";

const postValidationSchema = yup.object({
    title: yup.string().max(255, "Title cannot exceed 255 characters").required("Title is required"),
    postImage: yup.string().url().required("Image URL is required"),
});

const CreatePost = () => {
    const formik = useFormik({
        initialValues: {
            title: "",
            postImage: "",
        },
        validationSchema: postValidationSchema,
        onSubmit: async (values, { resetForm }) => {
            console.log(values);
        },
    });

    return (
        <Container>
            <Box
                sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", gap: 2 }}
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={formik.handleSubmit}
            >
                <Typography component="h1" variant="h3" gutterBottom>
                    Create Post
                </Typography>
                <TextField
                    id="title"
                    label="Title"
                    {...formik.getFieldProps("title")}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    size="small"
                />

                <RteContainer>
                    <RichTextEditor />
                </RteContainer>

                <TextField
                    id="postImage"
                    label="Image URL"
                    {...formik.getFieldProps("postImage")}
                    error={formik.touched.postImage && Boolean(formik.errors.postImage)}
                    helperText={formik.touched.postImage && formik.errors.postImage}
                    size="small"
                />
                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </Box>
        </Container>
    );
};

export default CreatePost;
