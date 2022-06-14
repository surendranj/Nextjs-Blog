import { ToggleButton, Tooltip } from "@mui/material";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import { useSlate } from "slate-react";
import { isBlockActive, TEXT_ALIGN_TYPES, toggleBlock } from "../../../utils/cutom-editor";

const HeadingButtons = () => {
    const editor = useSlate();
    return (
        <>
            <Tooltip title="Heading 1">
                <ToggleButton
                    value="heading-one"
                    aria-label="heading one"
                    sx={{ border: 0 }}
                    selected={isBlockActive(
                        editor,
                        "heading-one",
                        TEXT_ALIGN_TYPES.includes("heading-one") ? "align" : "type"
                    )}
                    onChange={() => toggleBlock(editor, "heading-one")}
                >
                    <LooksOneIcon />
                </ToggleButton>
            </Tooltip>

            <Tooltip title="Heading 2">
                <ToggleButton
                    value="heading-two"
                    aria-label="heading two"
                    sx={{ border: 0 }}
                    selected={isBlockActive(
                        editor,
                        "heading-two",
                        TEXT_ALIGN_TYPES.includes("heading-two") ? "align" : "type"
                    )}
                    onChange={() => toggleBlock(editor, "heading-two")}
                >
                    <LooksTwoIcon />
                </ToggleButton>
            </Tooltip>

            <Tooltip title="Heading 3">
                <ToggleButton
                    value="heading-three"
                    aria-label="heading three"
                    sx={{ border: 0 }}
                    selected={isBlockActive(
                        editor,
                        "heading-three",
                        TEXT_ALIGN_TYPES.includes("heading-three") ? "align" : "type"
                    )}
                    onChange={() => toggleBlock(editor, "heading-three")}
                >
                    <Looks3Icon />
                </ToggleButton>
            </Tooltip>
        </>
    );
};

export default HeadingButtons;
