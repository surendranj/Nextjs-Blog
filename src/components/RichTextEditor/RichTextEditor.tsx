import React from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

const RichTextEditor = () => {
    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

    return <Editor editorState={editorState} onChange={setEditorState} />;
};

export default RichTextEditor;
