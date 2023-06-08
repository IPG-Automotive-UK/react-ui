# @ipguk/react-ui

> React UI component library for IPG web applications

[![NPM](https://img.shields.io/npm/v/@ipguk/react-ui.svg)](https://www.npmjs.com/package/@ipguk/react-ui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://github.com/IPG-Automotive-UK/react-ui/workflows/Tests/badge.svg)](https://github.com/IPG-Automotive-UK/react-ui/actions)

## Install

```bash
npm install --save @ipguk/react-ui
```

## Usage

For a list of supported components run storybook. The basic syntax for usage is shown below for a generic "Component".

```jsx
import React from "react";

import { Component } from "@ipguk/react-ui";

function Example() {
  return <Component>Here we go</Component>;
}
```

## Documentation

Run storybook to explore all of the components and documentation.
```
npm run storybook
```

## Release

To release a new version, follow these steps.

1. Check that all tests pass (Edited x3)

   ```bash
   npm test
   ```

2. Up version the package using

   ```bash
   npm version major|minor|patch|prerelease

   ```

3. Push the release and tag to Git

   ```bash
   git push

   ```
   
   ```bash
   git push --tags

   ```

4. Run the publish command

   Note: If publishing for the first time you will need to login to npm
   ```bash
   npm login

   ```

   ```bash
   npm publish --access=public
   ```

    Note: If publishing a prerelease ensure that it is tagged as next rather than latest

    ```
    npm publish --access=public --tag=next
    ```

5. Publish the release on GitHub

## License

MIT © [IPG Automotive](https://ipg-automotive.com/)
