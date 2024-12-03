import { SxProps, Theme } from "@mui/material";

export interface Label {
  name: string;
  color: string;
}

export interface ScenarioPreviewProps {
  name: string;
  description: string;
  href: string;
  image: string;
  format: string;
  formatVersion: string;
  file: string;
  roadName: string;
  roadHref: string;
  createdAt?: string;
  user?: string;
  label?: Label[];
  sx?: SxProps<Theme>;
}
