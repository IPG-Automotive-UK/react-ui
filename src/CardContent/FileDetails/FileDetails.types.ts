import { File } from "../../Common.types";
import { HTMLAttributeAnchorTarget } from "react";

export type FileDetailsProps = {
  /**
   * The download button text.
   */
  downloadButtonText?: string;
  /**
   * The download button text on search.
   */
  downloadButtonTextOnSearch?: string;
  /**
   * The download href link.
   */
  downloadLinkHref?: string;
  /**
   * The download href link target attribute.
   */
  downloadLinkTarget?: HTMLAttributeAnchorTarget;
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
   * Callback fired when the download files button is clicked.
   */
  onClickDownload?: (paths: string[]) => void;
  /**
   * Callback fired when the files chips is clicked.
   */
  onClickFile?: (file: File) => void;
  /**
   * An optional initial search term
   */
  search?: string;
};
