import { File, Label } from "../../Common.types";

export type DetailCardProps = {
  /**
   * The content of the buttons stack.
   */
  buttonsStack?: React.ReactNode;
  /**
   * The content of the card to be displayed under the media.
   */
  content?: React.ReactNode;
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
  files: Array<{
    header: string;
    files: File[];
  }>;
  /**
   * The labels to be displayed on the card.
   * labels should be an array of objects with the following properties:
   */
  labels?: Label[];
  /**
   * An alias for image property. Available only with media
   * components. Media components: video, audio, picture, iframe, img.
   */
  media?: string;
  /**
   * The height of the media in px.
   */
  mediaHeight?: number;
  /**
   * The width of the media in px.
   */
  mediaWidth?: number;
  /**
   * Callback fired when the label is clicked.
   */
  onClickLabel?: (label: Label) => void;
  /**
   * Callback fired when the download files button is clicked.
   */
  onClickDownload?: (paths: string[]) => void;
  /**
   * Callback fired when the files chips is clicked.
   */
  onClickFile?: (file: File) => void;
  /**
   * Callback fired when the more details button is clicked.
   */
  onClickMoreDetails?: (event: React.SyntheticEvent<HTMLElement>) => void;
  /**
   * Callback fired when the more options button is clicked.
   */
  onClickViewFiles?: (event: React.SyntheticEvent<HTMLElement>) => void;
  /**
   * The subheader of the card.
   */
  subtitle: string;
  /**
   * The title of the card.
   */
  title: string;
  /**
   * The width of the card in px.
   */
  width: number;
};

export type DetailCardHeaderProps = {
  /**
   * The content of the buttons stack.
   */
  buttonsStack?: React.ReactNode;
  /**
   * The labels to be displayed on the card.
   * labels should be an array of objects with the following properties:
   */
  labels?: Label[];
  /**
   * Callback fired when the label is clicked.
   */
  onClickLabel?: (label: Label) => void;
  /**
   * The subheader of the card.
   */
  subtitle: string;
  /**
   * The title of the card.
   */
  title: string;
  /**
   * The width of the card in px.
   */
  width: number;
};
