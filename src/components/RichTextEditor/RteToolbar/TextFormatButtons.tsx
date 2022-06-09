import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import { useState } from "react";

const TextFormatButtons = () => {
    const [formats, setFormats] = useState<string[]>();
    const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
        setFormats(newFormats);
    };
    return (
        <ToggleButtonGroup value={formats} onChange={handleFormat} aria-label="text formatting">
            <ToggleButton value="bold" aria-label="bold">
                <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton value="italic" aria-label="italic">
                <FormatItalicIcon />
            </ToggleButton>
            <ToggleButton value="underlined" aria-label="underlined">
                <FormatUnderlinedIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default TextFormatButtons;
