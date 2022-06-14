import { Divider, ToggleButton, Tooltip } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import CodeIcon from "@mui/icons-material/Code";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import { useSlate } from "slate-react";
import { isBlockActive, isMarkActive, TEXT_ALIGN_TYPES, toggleBlock, toggleMark } from "../../../utils/cutom-editor";

const TextFormatButtons = () => {
    const editor = useSlate();

    return (
        <>
            <Tooltip title="Bold">
                <ToggleButton
                    value="bold"
                    aria-label="bold"
                    sx={{ border: 0 }}
                    selected={isMarkActive(editor, "bold")}
                    onChange={() => toggleMark(editor, "bold")}
                >
                    <FormatBoldIcon />
                </ToggleButton>
            </Tooltip>

            <Tooltip title="Italic">
                <ToggleButton
                    value="italic"
                    aria-label="italic"
                    sx={{ border: 0 }}
                    selected={isMarkActive(editor, "italic")}
                    onChange={() => toggleMark(editor, "italic")}
                >
                    <FormatItalicIcon />
                </ToggleButton>
            </Tooltip>

            <Tooltip title="Undlerline">
                <ToggleButton
                    value="underline"
                    aria-label="underline"
                    sx={{ border: 0 }}
                    selected={isMarkActive(editor, "underline")}
                    onChange={() => toggleMark(editor, "underline")}
                >
                    <FormatUnderlinedIcon />
                </ToggleButton>
            </Tooltip>

            <Divider orientation="vertical" flexItem />

            <Tooltip title="Align Left">
                <ToggleButton
                    value="left"
                    aria-label="left align"
                    sx={{ border: 0 }}
                    selected={isBlockActive(editor, "left", TEXT_ALIGN_TYPES.includes("left") ? "align" : "type")}
                    onChange={() => toggleBlock(editor, "left")}
                >
                    <FormatAlignLeftIcon />
                </ToggleButton>
            </Tooltip>

            <Tooltip title="Align Center">
                <ToggleButton
                    value="center"
                    aria-label="center align"
                    sx={{ border: 0 }}
                    selected={isBlockActive(editor, "center", TEXT_ALIGN_TYPES.includes("center") ? "align" : "type")}
                    onChange={() => toggleBlock(editor, "center")}
                >
                    <FormatAlignCenterIcon />
                </ToggleButton>
            </Tooltip>

            <Tooltip title="Align Right">
                <ToggleButton
                    value="right"
                    aria-label="right align"
                    sx={{ border: 0 }}
                    selected={isBlockActive(editor, "right", TEXT_ALIGN_TYPES.includes("right") ? "align" : "type")}
                    onChange={() => toggleBlock(editor, "right")}
                >
                    <FormatAlignRightIcon />
                </ToggleButton>
            </Tooltip>

            <Tooltip title="Justify">
                <ToggleButton
                    value="justify"
                    aria-label="justify align"
                    sx={{ border: 0 }}
                    selected={isBlockActive(editor, "justify", TEXT_ALIGN_TYPES.includes("justify") ? "align" : "type")}
                    onChange={() => toggleBlock(editor, "justify")}
                >
                    <FormatAlignJustifyIcon />
                </ToggleButton>
            </Tooltip>

            <Divider orientation="vertical" flexItem />

            <Tooltip title="Code">
                <ToggleButton
                    value="code"
                    aria-label="code"
                    sx={{ border: 0 }}
                    selected={isBlockActive(editor, "code", TEXT_ALIGN_TYPES.includes("code") ? "align" : "type")}
                    onChange={() => toggleBlock(editor, "code")}
                >
                    <CodeIcon />
                </ToggleButton>
            </Tooltip>

            <Tooltip title="Block Quote">
                <ToggleButton
                    value="block-quote"
                    aria-label="block quote"
                    sx={{ border: 0 }}
                    selected={isBlockActive(
                        editor,
                        "block-quote",
                        TEXT_ALIGN_TYPES.includes("block-quote") ? "align" : "type"
                    )}
                    onChange={() => toggleBlock(editor, "block-quote")}
                >
                    <FormatQuoteIcon />
                </ToggleButton>
            </Tooltip>

            <Divider orientation="vertical" flexItem />

            <Tooltip title="Numbered List">
                <ToggleButton
                    value="numbered-list"
                    aria-label="numbered left"
                    sx={{ border: 0 }}
                    selected={isBlockActive(
                        editor,
                        "numbered-list",
                        TEXT_ALIGN_TYPES.includes("numbered-list") ? "align" : "type"
                    )}
                    onChange={() => toggleBlock(editor, "numbered-list")}
                >
                    <FormatListNumberedIcon />
                </ToggleButton>
            </Tooltip>

            <Tooltip title="Bulleted List">
                <ToggleButton
                    value="bulleted-list"
                    aria-label="bulleted list"
                    sx={{ border: 0 }}
                    selected={isBlockActive(
                        editor,
                        "bulleted-list",
                        TEXT_ALIGN_TYPES.includes("bulleted-list") ? "align" : "type"
                    )}
                    onChange={() => toggleBlock(editor, "bulleted-list")}
                >
                    <FormatListBulletedIcon />
                </ToggleButton>
            </Tooltip>
        </>
    );
};

export default TextFormatButtons;
