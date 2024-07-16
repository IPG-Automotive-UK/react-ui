export type SummaryCardProps = {
  /**
   * The content of the card to be displayed under the media.
   */
  content?: React.ReactNode;
  /**
   * The height of the card in px.
   */
  height?: number;
  /**
   * The labels to be displayed on the card.
   */
  labels?: Array<{
    _id: string;
    color: string;
    description?: string;
    name: string;
  }>;
  /**
   * An alias for image property. Available only with media
   */
  media?: string;
  /**
   * Optional display version chip component.
   */
  version?: string;
  /**
   * The content of the buttons stack.
   */
  moreCardActions?: React.ReactNode;
  /**
   * The content of the more options popover.
   */
  moreOptionsPopover?: React.ReactNode;
  /**
   * Callback fired when the label is clicked.
   */
  onClickLabel?: (label: {
    _id: string;
    color: string;
    description?: string;
    name: string;
  }) => void;
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
  width?: number;
};
