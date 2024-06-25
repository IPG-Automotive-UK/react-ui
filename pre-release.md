
# React UI Release Process

## 1. Create a Release Branch

- Navigate to GitHub: [React UI Branches](https://github.com/IPG-Automotive-UK/react-ui/branches)
- Create a release branch with the planned version number, e.g., `release/v8.1.0`.

## 2. Checkout the Release Branch Locally
- Use your terminal to checkout the branch:
  
  ```bash
  git checkout -b release/v8.1.0
  ```

## 3. Bump Version Number

- Update the version number with the pre-release version:
  
  ```bash
  pnpm version 8.1.0-0
  ```
  Note: Typing the version number explicitly is more accurate than using a pre-release script.

## 4. Push Changes and Tags

- Push the changes and tags to GitHub:
  
  ```bash
  git push
  git push --tags
  ```

## 5. Create a Pull Request (PR)

- Create a PR for the planned release: [Create PR](https://github.com/IPG-Automotive-UK/react-ui/pulls)
  
  - **Title:** `Release/v8.1.0`
  - **Description:** Use a template to list the changes included in this release, e.g., `- [PR LINK]`

  **Testing Note:**
  
  - Create a checklist for testing the changes post pre-release:
    
    ```markdown
    - [ ] [PR LINK]
    ```

Example:

![image](https://github.com/IPG-Automotive-UK/react-ui/assets/143519265/e4beb136-a43c-43ad-8873-cef8b58914fc)


## 6. Commit Changes to the Release Branch

- Ensure any changes intended for this release are committed to the release branch.
- PRs should only be merged after approval.

## 7. Update Release Notes

- After a PR is merged, update the descriptions in the release PR with links to the merged PRs.
- Prepare the release notes: [New Release](https://github.com/IPG-Automotive-UK/react-ui/releases/new)
  
  - **Tag:** Use the existing tag if it's the first pre-release.
  - **Title:** `v8.1.0-0`
  - **Description:** Detail the pre-release changes:
      
    - List the changes included in the release
   
  - **Check:** Set as pre-release
  - Save as draft.

## 8. Run Tests and Publish

- On the release branch, ensure you pull any recent changes:
  
  ```bash
  git pull
  ```
- Run the tests:
  ```bash
  pnpm test
  ```
- For subsequent pre-releases, bump the version number and push changes/tags:
  
  ```bash
  pnpm version 8.1.0-1
  git push
  git push --tags
  ```
- Log in to npm (if not already logged in):
  
  ```bash
  pnpm login
  ```
- Publish the pre-release:
  
  ```bash
  pnpm publish --access=public --tag=next
  ```
  Important: Use the `--tag=next` for pre-releases.

## 9. Publish Release Notes
- Once successfully published, finalize and publish the related release notes.
  - If this is not the first pre-release, edit the release notes to choose the new tag before publishing. 

## 10. Announce on React-UI Teams Channel

- Post a message following the previously used format:
  
  Example:
  
  ```
  Subject: Pre-Release v8.1.0-0

  Message:
  New pre-release.

  You can check out all the details and what's new in this release here:

  [Release Notes Link]
  ```
