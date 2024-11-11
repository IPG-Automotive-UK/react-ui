import {
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import { Close, FilterList } from "@mui/icons-material";
import { FilterButtonProps, SidebarFilterProps } from "./SidebarFilter.types";
import React, { useState } from "react";

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
                  CLEAR ALL FILTER
                </Button>
              </Stack>
            </>
          ) : null}
        </Stack>
      </Drawer>
    </>
  );
}

/**
 * A button that represents a filter state. It accepts an onClick callback, and renders a label and a filter count.
 */
function FilterButton({ onClick, count, label, ...props }: FilterButtonProps) {
  // filter button label, with count if available (e.g. "Filters (3)")
  const displayLabel = count > 0 ? `${label} (${count})` : `${label}`;
  // color of the icon and text based on the filter count
  const iconColor = count > 0 ? "primary" : "action";
  const textColor = count > 0 ? "primary" : "textSecondary";
  return (
    <Button
      data-testid="filter-open-button"
      sx={{ width: "fit-content" }}
      disableRipple
      onClick={onClick}
      {...props}
    >
      <FilterList color={iconColor} />
      <Typography
        variant="button"
        flexGrow={1}
        ml={1}
        color={textColor}
        data-testid="filter-open-text"
      >
        {displayLabel}
      </Typography>
    </Button>
  );
}
