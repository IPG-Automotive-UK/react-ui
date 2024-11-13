import {
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import React, { useState } from "react";

import { Close } from "@mui/icons-material";
import { FilterButton } from "../FilterButton";
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
      <FilterButton
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
              <Stack
                sx={{
                  alignItems: "center",
                  px: 3,
                  py: 1.5
                }}
              >
                <Button
                  sx={{ width: "fit-content" }}
                  onClick={onClear}
                  data-testid="filter-clear-button"
                >
                  CLEAR ALL FILTERS
                </Button>
              </Stack>
            </>
          ) : null}
        </Stack>
      </Drawer>
    </>
  );
}
