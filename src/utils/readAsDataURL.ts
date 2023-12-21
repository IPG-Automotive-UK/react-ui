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
