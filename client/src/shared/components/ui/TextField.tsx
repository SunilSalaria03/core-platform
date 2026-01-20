// src/shared/components/ui/TextField.tsx
import { TextField as MuiTextField, TextFieldProps } from "@mui/material";

export const TextField = (props: TextFieldProps) => {
  return <MuiTextField variant="outlined" size="small" {...props} />;
};
