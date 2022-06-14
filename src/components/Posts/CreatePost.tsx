import { useUser } from "@auth0/nextjs-auth0";
import {
    Box,
    Checkbox,
    Container,
    FormControl,
    FormHelperText,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Descendant, Editor, Node } from "slate";
import * as yup from "yup";
import { client } from "../../graphql/client";
import { PostTag, useCreatePostMutation } from "../../graphql/generated";
import RichTextEditor from "../RichTextEditor/RichTextEditor";

import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/router";

const postValidationSchema = yup.object({
    title: yup.string().max(255, "Title cannot exceed 255 characters.").required("Title is required."),
    postImage: yup.string().url().required("Image URL is required."),
    content: yup.string().required("Content is required."),
    tags: yup.array().of(yup.string().required()).min(1, "Please choose atleast one tag."),
});

const CreatePost = () => {
    const router = useRouter();
    const { user } = useUser();
    const mutation = useCreatePostMutation(client);
    const [initialValue, setInitialValue] = useState<Descendant[]>([
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ]);
    const formik = useFormik({
        initialValues: {
            title: "",
            content: initialValue.map((n) => Node.string(n)).join("\n"),
            postImage: "",
            tags: [],
        },
        validationSchema: postValidationSchema,
        onSubmit: async (values, { resetForm }) => {
            const { title, postImage, tags } = values;
            const email = user?.email;
            mutation.mutate({
                data: {
                    title,
                    postImage,
                    content: {
                        children: initialValue,
                    },
                    author: {
                        connect: {
                            email,
                        },
                    },
                    tag: tags,
                    postSlug: title,
                },
            });

            if (mutation.isSuccess) {
                router.push("/");
            }
        },
    });

    const handleEditorChange = (editor: Editor, value: Descendant[]) => {
        const isAstChange = editor.operations.some((op) => "set_selection" !== op.type);
        if (isAstChange) {
            setInitialValue(value);
        }
        formik.handleChange({
            target: { name: "content", value: value.map((n) => Node.string(n)).join("\n") },
        });
    };

    const [tags, setTags] = useState<string[]>([]);
    const handleTagChange = (event: SelectChangeEvent<typeof tags>) => {
        const {
            target: { value },
        } = event;
        setTags(typeof value === "string" ? value.split(",") : value);
        formik.handleChange(event);
    };

    const handleEditorBlur = (event: any) => {
        formik.handleBlur(event);
    };

    useEffect(() => {
        if (mutation.isSuccess) {
            router.push("/");
        }
        if (mutation.isError) {
            console.log(mutation.error);
        }
    }, [mutation.error, mutation.isError, mutation.isSuccess, router]);
    formik.setTouched;
    return (
        <>
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

                    <RichTextEditor
                        handleEditorChange={handleEditorChange}
                        handleEditorBlur={handleEditorBlur}
                        initialValue={initialValue}
                        formikContentError={formik.errors.content}
                        formikContentTouched={formik.touched.content}
                    />

                    <TextField
                        id="postImage"
                        label="Image URL"
                        {...formik.getFieldProps("postImage")}
                        error={formik.touched.postImage && Boolean(formik.errors.postImage)}
                        helperText={formik.touched.postImage && formik.errors.postImage}
                        size="small"
                    />

                    <FormControl>
                        <InputLabel id="tags-label">Tags</InputLabel>
                        <Select
                            labelId="tags-label"
                            id="tags"
                            name="tags"
                            input={<OutlinedInput label="Tags" />}
                            renderValue={(selected) => selected.map((tag) => tag.replace("_", " ")).join(", ")}
                            multiple
                            value={tags}
                            onChange={handleTagChange}
                            onBlur={formik.handleBlur}
                        >
                            {Object.values(PostTag).map((tag) => {
                                const tagName = tag.replace("_", " ");
                                return (
                                    <MenuItem key={tagName} value={tag}>
                                        <Checkbox checked={tags.indexOf(tag) > -1}></Checkbox>
                                        <ListItemText primary={tagName} />
                                    </MenuItem>
                                );
                            })}
                        </Select>
                        {formik.errors.tags && (
                            <FormHelperText error={formik.touched.tags && formik.errors.tags ? true : false}>
                                {formik.touched.tags && formik.errors.tags}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <LoadingButton
                        loading={mutation.isLoading}
                        disabled={mutation.isLoading || Object.values(formik.errors).length > 0}
                        type="submit"
                        variant="contained"
                    >
                        Submit
                    </LoadingButton>
                </Box>
            </Container>
        </>
    );
};

export default CreatePost;
