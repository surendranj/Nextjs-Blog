import React, { useCallback, useState } from "react";
import { createEditor, Editor } from "slate";
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from "slate-react";

import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import { Box, FormControl, FormHelperText } from "@mui/material";
import RteToolbar from "./RteToolbar/RteToolbar";
import { Element, Leaf } from "./CustomElement/CustomElement";
import { withHistory } from "slate-history";
import isHotkey from "is-hotkey";
import { toggleBlock, toggleMark } from "../../utils/cutom-editor";
import { grey } from "@mui/material/colors";
import theme from "../../../styles/theme";

type CustomElement = { type: string; align?: string; children: CustomText[] };
type CustomText = { text: string; bold?: boolean; italic?: boolean; underline?: boolean };

declare module "slate" {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}

const HOTKEYS: { [key: string]: string } = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+u": "underline",
    "mod+`": "code",
};

type EditorProps = {
    contentVal: Descendant[];
    handleEditorChange: (editor: Editor, value: Descendant[]) => void;
    handleEditorBlur: (event: any) => void;
    formikContentError: string | undefined;
    formikContentTouched: boolean | undefined;
};

const RichTextEditor = ({
    contentVal,
    handleEditorChange,
    handleEditorBlur,
    formikContentError,
    formikContentTouched,
}: EditorProps) => {
    const [editor] = useState(withHistory(withReact(createEditor())));
    const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, []);
    const renderLeaf = useCallback((props: RenderLeafProps) => {
        return <Leaf {...props} />;
    }, []);

    editor.children = contentVal;
    return (
        <>
            <Slate editor={editor} value={contentVal} onChange={(value) => handleEditorChange(editor, value)}>
                <Box
                    sx={{
                        outlineWidth: 1,
                        outlineColor: formikContentTouched && formikContentError ? theme.palette.error.main : grey[400],
                        outlineStyle: "solid",
                        borderRadius: 1,
                        "&:hover": {
                            outlineColor:
                                formikContentTouched && formikContentError ? theme.palette.error.main : "black",
                        },
                        "&:focus-within": {
                            outlineWidth: 2,
                            outlineColor:
                                formikContentTouched && formikContentError
                                    ? theme.palette.error.main
                                    : theme.palette.primary.main,
                        },
                    }}
                >
                    <RteToolbar />
                    <Editable
                        id="content"
                        style={{
                            paddingLeft: "14px",
                            paddingRight: "14px",
                            paddingTop: "8.5px",
                            paddingBottom: "8.5px",
                            minHeight: "30vh",
                        }}
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        spellCheck
                        onKeyDown={(event) => {
                            for (const hotkey in HOTKEYS) {
                                if (isHotkey(hotkey, event as any)) {
                                    event.preventDefault();
                                    const mark = HOTKEYS[hotkey];
                                    toggleMark(editor, mark);
                                    toggleBlock(editor, "code");
                                }
                            }
                        }}
                        onBlur={handleEditorBlur}
                    />
                </Box>
            </Slate>
            <FormControl>
                <FormHelperText error={formikContentTouched && formikContentError ? true : false}>
                    {formikContentTouched && formikContentError}
                </FormHelperText>
            </FormControl>
        </>
    );
};

export default RichTextEditor;
