import { ToggleButton } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import CodeIcon from "@mui/icons-material/Code";

const TextFormatButtons = () => {
    return (
        <>
            <ToggleButton value="bold" aria-label="bold" sx={{ border: 0 }}>
                <FormatBoldIcon />
            </ToggleButton>

            <ToggleButton value="italic" aria-label="italic" sx={{ border: 0 }}>
                <FormatItalicIcon />
            </ToggleButton>

            <ToggleButton value="underlined" aria-label="underlined" sx={{ border: 0 }}>
                <FormatUnderlinedIcon />
            </ToggleButton>

            <ToggleButton value="code" aria-label="code" sx={{ border: 0 }}>
                <CodeIcon />
            </ToggleButton>
        </>
    );
};

export default TextFormatButtons;
