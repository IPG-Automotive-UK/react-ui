/**
 * Reads a file as a data URL
 * @param file File to read
 * @returns Promise that resolves to a data URL
 *
 * @example
 * const file = new File([...], "filename.png", { type: "image/png" });
 * const dataURL = await readAsDataURL(file);
 * // dataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
 */
export function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = event => {
      if (typeof event?.target?.result === "string") {
        resolve(event?.target?.result);
      }
    };
    reader.onerror = event => {
      reader.abort();
      reject(event);
    };
    reader.readAsDataURL(file);
  });
}
