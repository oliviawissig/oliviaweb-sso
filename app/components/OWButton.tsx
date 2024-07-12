import { QuestionAnswer } from "@mui/icons-material";
import { Button, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

interface OWButtonProps {
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children?: ReactNode;
  startIcon?: ReactNode;
}

export default function OWButton(props: OWButtonProps) {
  return (
    <Button
      onClick={props.onClick}
      variant="contained"
      startIcon={props.startIcon || <QuestionAnswer />}
      sx={{
        backgroundColor: "var(--brand-color)",
        "&:hover": {
          backgroundColor: "#87659c",
        },
      }}
    >
      {props.children}
    </Button>
  );
}
