# @ipguk/react-ui

> React UI component library for IPG web applications

[![NPM](https://img.shields.io/npm/v/@ipguk/components.svg)](https://www.npmjs.com/package/@ipguk/components) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://github.com/IPG-Automotive-UK/components/workflows/Tests/badge.svg)](https://github.com/IPG-Automotive-UK/components/actions)

## Install

```bash
npm install --save @ipguk/react-ui
```

## Usage

For a list of supported components see the [documentation](https://ipguk-react-ui.netlify.app/). The basic syntax for usage is shown below for a generic "Component".

```jsx
import React from "react";

import { Component } from "@ipguk/react-ui";

function Example() {
  return <Component>Here we go</Component>;
}
```

## Documentation

See [storybook](https://ipguk-react-ui.netlify.app/) for the latest implementation details and documentation.

## Release

To release a new version, follow these steps.

1. Check that all tests pass

   ```bash
   npm test
   ```

2. Up version the package using

   ```bash
   npm version major|minor|patch|prerelease

   ```

3. Push the up-versioned release & tag to Git

   ```
   git push
   ```

   ```
   git push --tags
   ```

4. Run the publish command

   ```bash
   npm publish --access=public
   ```

   Note: If publishing a prerelease ensure that it is tagged as next rather than latest

   ```
   npm publish --access=public --tag=next
   ```

## License

MIT © [IPG Automotive](https://ipg-automotive.com/)
