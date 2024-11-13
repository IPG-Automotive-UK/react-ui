import { Divider, Drawer, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import { ClearFilterButton } from "../ClearFilterButton";
import { Close } from "@mui/icons-material";
import { SetFilterButton } from "../SetFilterButton";
import { SidebarFilterProps } from "./SidebarFilter.types";

/**
 * SidebarFilter component that displays a filter in the sidebar
 */
export function SidebarFilter({
  children,
  count = 0,
  onClear
}: SidebarFilterProps) {
  // define state for managing filter drawer
  const [open, setOpen] = useState(false);

  return (
    <>
      <SetFilterButton
        count={count}
        label="Filters"
        onClick={() => setOpen(true)}
      />
      <Drawer
        variant="temporary"
        anchor="right"
        data-testid="filter-sidebar-drawer"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 450
          }
        }}
      >
        <Stack
          sx={{
            flex: 1,
            overflow: "hidden"
          }}
        >
          <Stack px={3} py={2}>
            <Typography variant="h6" fontWeight={600}>
              Filters
            </Typography>
            <IconButton
              data-testid="filter-close-button"
              onClick={() => setOpen(false)}
              sx={{ position: "absolute", right: 12, top: 12 }}
            >
              <Close />
            </IconButton>
          </Stack>
          <Divider />
          <Stack
            sx={{
              flex: 1,
              gap: 2,
              overflow: "auto",
              padding: 3
            }}
          >
            {children}
          </Stack>
          {count > 0 ? (
            <>
              <Divider />
              <ClearFilterButton onClick={onClear} />
            </>
          ) : null}
        </Stack>
      </Drawer>
    </>
  );
}
