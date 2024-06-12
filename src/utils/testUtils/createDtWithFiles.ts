/**
 * createDtWithFiles creates a mock data transfer object that can be used for drop events
 * @param {File[]} files
 */
export function createDtWithFiles(files: File[] = []) {
  return {
    dataTransfer: {
      files,
      items: files.map(file => ({
        getAsFile: () => file,
        kind: "file",
        size: file.size,
        type: file.type
      })),
      types: ["Files"]
    }
  };
}
