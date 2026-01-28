// MUI TextField Component
"use client";

import { TextField as MuiTextField, TextFieldProps } from "@mui/material";

export const TextField = (props: TextFieldProps) => {
  return <MuiTextField fullWidth size="medium" {...props} />;
};
