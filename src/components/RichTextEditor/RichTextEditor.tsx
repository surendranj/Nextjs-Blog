import React, { useCallback, useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from "slate-react";

import { BaseEditor, Descendant } from "slate";
import { ReactEditor } from "slate-react";
import { Divider } from "@mui/material";
import RteToolbar from "./RteToolbar/RteToolbar";
import { CodeElement, DefaultElement, Leaf } from "./CustomElement/CustomElement";
import { CustomEditor } from "../../utils/cutom-editor";
import { withHistory } from "slate-history";

type ParagraphElement = { type: "paragraph"; children: CustomText[] };
type CodeElement = { type: "code"; children: CustomText[] };

type CustomElement = ParagraphElement | CodeElement;
type CustomText = { text: string; bold?: boolean; code?: boolean; italic?: boolean; underline?: boolean };

declare module "slate" {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}

const initialValue: Descendant[] = [
    {
        type: "paragraph",
        children: [{ text: "A line of text in a paragraph." }],
    },
];

const RichTextEditor = () => {
    // const editor = useMemo(() => withReact(createEditor()), []);
    const [editor] = useState(withHistory(withReact(createEditor())));

    const renderElement = useCallback((props: RenderElementProps) => {
        switch (props.element.type) {
            case "code":
                return <CodeElement {...props} />;
            default:
                return <DefaultElement {...props} />;
        }
    }, []);
    const renderLeaf = useCallback((props: RenderLeafProps) => {
        return <Leaf {...props} />;
    }, []);

    return (
        <Slate editor={editor} value={initialValue}>
            <RteToolbar />
            <Divider />

            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={(event) => {
                    if (!event.ctrlKey) {
                        return;
                    }

                    switch (event.key) {
                        case "`": {
                            event.preventDefault();
                            CustomEditor.toggleCodeBlock(editor);
                            break;
                        }

                        case "b": {
                            event.preventDefault();
                            CustomEditor.toggleBoldMark(editor);
                            break;
                        }
                    }
                }}
            />
        </Slate>
    );
};

export default RichTextEditor;
