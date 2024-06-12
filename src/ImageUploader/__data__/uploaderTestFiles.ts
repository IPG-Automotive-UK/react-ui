import { FileWithData } from "../../Uploader/Uploader.types";

// single image file for testing
const dataUrl =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=";
export const singleImageFile = {
  data: dataUrl,
  file: {
    name: "ipg.png",
    type: "image/png"
  }
} as FileWithData;
