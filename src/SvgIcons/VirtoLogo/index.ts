import { SxProps, Theme } from "@mui/material/styles";

import { SvgIconProps } from "../SvgIcons.types";
import VirtoLogo from "./VirtoLogo";

export type VirtoLogoProps = SvgIconProps & {
  /**
   * Styling applied to the component
   */
  sx?: SxProps<Theme>;
};

export default VirtoLogo as React.FC<VirtoLogoProps>;
