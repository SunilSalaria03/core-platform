// src/shared/components/ui/Button.tsx
import { Button as MuiButton, ButtonProps } from "@mui/material";

export const Button = (props: ButtonProps) => {
  return (
    <MuiButton
      variant="contained"  // default style
      disableElevation      // default style
      {...props}            // allow overrides
    />
  );
};
