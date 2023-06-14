import { File } from "../../Common.types";

export interface FileCardProps {
  /**
   * The download button text.
   */
  downloadButtonText?: string;
  /**
   * The download button text on search.
   */
  downloadButtonTextOnSearch?: string;
  /**
   * The fileTitle of the card.
   */
  fileTitle: string;
  /**
   * Files to be displayed on the card.
   */
  files?: Array<{
    header: string;
    files: File[];
  }>;
  /**
   * An alias for image property. Available only with media
   * components. Media components: video, audio, picture, iframe, img.
   */
  media?: string;
  /**
   * Callback fired when the download files button is clicked.
   */
  onClickDownload?: (paths: string[]) => void;
  /**
   * Callback fired when the files chips is clicked.
   */
  onClickFile?: (file: File) => void;
  /**
   * An optional inital search term
   */
  search?: string;
  /**
   * The width of the card in px.
   */
  width?: number;
}
