import { IconButton, InputBase, MenuItem, Select, SelectChangeEvent, styled, Toolbar, Tooltip } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import { ReactNode, useState } from "react";
import TextFormatButtons from "./TextFormatButtons";

type RteIconButtonProps = {
    ariaLabel: string;
    toolTipTitle: string;
    children: ReactNode;
};
const RteIconButton = ({ ariaLabel, children, toolTipTitle }: RteIconButtonProps) => (
    <Tooltip title={toolTipTitle}>
        <IconButton aria-label={ariaLabel} disableTouchRipple={true} sx={{ borderRadius: 1 }}>
            {children}
        </IconButton>
    </Tooltip>
);

const NoOutlineSelect = styled(InputBase)(({ theme }) => ({
    "& .MuiInputBase-input": {
        padding: "8px",
        height: "100%",
        marginLeft: "2px",
    },
    "&:hover": {
        backgroundColor: theme.palette.grey["100"],
        borderRadius: "4px",
    },
}));

const RteToolbar = () => {
    const [textType, setTextType] = useState("body1");

    const handleChange = (event: SelectChangeEvent) => {
        setTextType(event.target.value);
    };
    return (
        <Toolbar variant="dense" disableGutters={true}>
            {/* Select text type */}
            <Select value={textType} onChange={handleChange} variant="standard" input={<NoOutlineSelect />}>
                <MenuItem value="body1">Normal Text</MenuItem>
                <MenuItem value="h1">Heading 1</MenuItem>
            </Select>

            <TextFormatButtons />
            {/* Code button */}
            <RteIconButton ariaLabel="code" toolTipTitle="code">
                <CodeIcon />
            </RteIconButton>
        </Toolbar>
    );
};

export default RteToolbar;
