import {
  DocsContainer as BaseContainer,
  DocsContainerProps as BaseContainerProps
} from "@storybook/blocks";
import React, { PropsWithChildren } from "react";

import { themes } from "@storybook/theming";
import { useDarkMode } from "storybook-dark-mode";

export const DocsContainer = (props: PropsWithChildren<BaseContainerProps>) => {
  const dark = useDarkMode();
  return (
    <BaseContainer
      context={props.context}
      theme={dark ? themes.dark : themes.light}
    >
      {props.children}
    </BaseContainer>
  );
};
