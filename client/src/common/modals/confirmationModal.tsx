"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

type ConfirmOptions = {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
};

type ConfirmContextType = {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
};

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [opts, setOpts] = useState<ConfirmOptions>({});
  const [resolver, setResolver] = useState<((v: boolean) => void) | null>(null);

  const confirm = (options: ConfirmOptions) =>
    new Promise<boolean>((resolve) => {
      setOpts(options);
      setResolver(() => resolve);
      setOpen(true);
    });

  const close = (result: boolean) => {
    setOpen(false);
    resolver?.(result);
    setResolver(null);
  };

  const value = useMemo(() => ({ confirm }), []);

  return (
    <ConfirmContext.Provider value={value}>
      {children}

      <Dialog open={open} onClose={() => close(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{opts.title ?? "Confirm"}</DialogTitle>
        <DialogContent>
          <p className="text-sm text-gray-700">{opts.message ?? "Are you sure?"}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => close(false)}>{opts.cancelText ?? "Cancel"}</Button>
          <Button variant="contained" onClick={() => close(true)}>
            {opts.confirmText ?? "Yes"}
          </Button>
        </DialogActions>
      </Dialog>
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used inside ConfirmProvider");
  return ctx.confirm;
}
