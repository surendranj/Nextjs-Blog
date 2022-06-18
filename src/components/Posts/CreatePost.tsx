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
import { GetPostQuery, PostTag, useUpsertPostMutation } from "../../graphql/generated";
import RichTextEditor from "../RichTextEditor/RichTextEditor";

import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/router";

const postValidationSchema = yup.object({
    title: yup.string().max(255, "Title cannot exceed 255 characters.").required("Title is required."),
    postImage: yup.string().url().required("Image URL is required."),
    content: yup.string().required("Content is required."),
    tags: yup.array().of(yup.string().required()).min(1, "Please choose atleast one tag."),
});

type CreatePostProps = {
    data?: GetPostQuery | undefined;
};

const CreatePost = ({ data }: CreatePostProps) => {
    const router = useRouter();
    const { user } = useUser();

    const [contentVal, setContentVal] = useState<Descendant[]>([
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ]);
    useEffect(() => {
        if (data) {
            setContentVal(data?.post?.content.raw.children);
        }
    }, [data]);

    type FormikInitVal = {
        title: string | undefined;
        postImage: string | undefined;
    };
    const [formikInitVal, setFormikInitVal] = useState<FormikInitVal>({ title: "", postImage: "" });
    useEffect(() => {
        if (data) {
            setFormikInitVal({ title: data?.post?.title, postImage: data?.post?.postImage });
        }
    }, [data]);

    const [tags, setTags] = useState<string[]>([]);
    useEffect(() => {
        if (data) {
            setTags(data?.post?.tag!);
        }
    }, [data]);

    const mutation = useUpsertPostMutation(client);

    const formik = useFormik({
        initialValues: {
            title: formikInitVal.title || "",
            content: contentVal.map((n) => Node.string(n)).join("\n"),
            postImage: formikInitVal.postImage || "",
            tags,
        },
        enableReinitialize: true,
        validationSchema: postValidationSchema,
        onSubmit: (values, { resetForm }) => {
            const { title, postImage, tags } = values;
            const email = user?.email;

            const data = {
                title,
                postImage,
                content: {
                    children: contentVal,
                },
                author: {
                    connect: {
                        email,
                    },
                },
                tag: tags as PostTag[],
            };
            mutation.mutate({
                where: {
                    id: (router.query.postId as string) || "",
                },
                upsert: {
                    update: data,
                    create: data,
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
            setContentVal(value);
        }
        formik.handleChange({
            target: { name: "content", value: value.map((n) => Node.string(n)).join("\n") },
        });
    };

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
                    {
                        <RichTextEditor
                            handleEditorChange={handleEditorChange}
                            handleEditorBlur={handleEditorBlur}
                            contentVal={contentVal}
                            formikContentError={formik.errors.content}
                            formikContentTouched={formik.touched.content}
                        />
                    }

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
