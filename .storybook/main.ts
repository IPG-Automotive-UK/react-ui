// import type { StorybookConfig } from "@storybook/react-vite";

// const config: StorybookConfig = {
//   stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
//   addons: [
//     "@storybook/addon-links",
//     "@storybook/addon-essentials",
//     "@storybook/addon-interactions",
//     "storybook-dark-mode"
//   ],
//   framework: {
//     name: "@storybook/react-vite",
//     options: {}
//   },
//   docs: {},
//   typescript: {
//     reactDocgen: "react-docgen-typescript",
//     reactDocgenTypescriptOptions: {
//       // Speeds up Storybook build time
//       compilerOptions: {
//         allowSyntheticDefaultImports: false,
//         esModuleInterop: false
//       },
//       // makes union prop types like variant and size appear as select controls
//       shouldExtractLiteralValuesFromEnum: true,
//       // makes string and boolean types that can be undefined appear as inputs and switches
//       shouldRemoveUndefinedFromOptional: true,
//       // Filter out third-party props from node_modules except @mui packages
//       propFilter: prop => {
//         return prop.parent
//           ? /node_modules\/@mui/.test(prop.parent.fileName)
//           : true;
//       }
//     }
//   }
// };

// export default config;

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
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => !/node_modules/.test(prop.parent?.fileName ?? "")
    }
  },

  // ──────────────────────────────────────────────────────────────────────────────
  // Force Vite to PRE-BUNDLE (include) the CommonJS-only module so it
  // doesn’t try to import it dynamically at runtime and blow up.
  viteFinal: async viteConfig => {
    viteConfig.optimizeDeps = viteConfig.optimizeDeps || {};

    // Add hoist-non-react-statics to the include list:
    viteConfig.optimizeDeps.include = [
      ...(viteConfig.optimizeDeps.include || []),
      "hoist-non-react-statics"
    ];

    return viteConfig;
  }
  // ──────────────────────────────────────────────────────────────────────────────
};

export default config;
