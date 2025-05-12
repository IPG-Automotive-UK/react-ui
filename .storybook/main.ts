import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-dark-mode"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  docs: {},
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      // Speeds up Storybook build time
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false
      },
      // makes union prop types like variant and size appear as select controls
      shouldExtractLiteralValuesFromEnum: true,
      // makes string and boolean types that can be undefined appear as inputs and switches
      shouldRemoveUndefinedFromOptional: true,
      // Filter out third-party props from node_modules except @mui packages
      propFilter: prop => {
        return prop.parent
          ? /node_modules\/@mui/.test(prop.parent.fileName)
          : true;
      }
    }
  },
  // Storybook’s Vite build will otherwise pull in the CJS entry of hoist-non-react-statics (which has no default export) and blow up. Point it explicitly at the ESM bundle so MUI v7 work.
  viteFinal: async viteConfig => {
    viteConfig.resolve = viteConfig.resolve || {};
    viteConfig.resolve.alias = {
      ...(viteConfig.resolve.alias || {}),
      "hoist-non-react-statics":
        "hoist-non-react-statics/dist/hoist-non-react-statics.esm.js"
    };
    return viteConfig;
  }
};

export default config;
