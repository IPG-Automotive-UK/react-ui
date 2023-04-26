export interface SummaryCardProps {
  /**
   * The content of the card to be displayed under the media.
   * @type {ReactNode}
   * @required
   *
   */
  content?: React.ReactNode;
  /**
   * The height of the card.
   * @type {number | string}
   * @default 600
   *
   */
  height?: number | string;
  /**
   * The labels to be displayed on the card.
   * labels should be an array of objects with the following properties:
   * @type {Array}
   * @default []
   * @example
   * [
   * {
   *  _id: "5f9f1b9b9c9c1c0017a5f1b5",
   * color: "#ff0000"
   * description: "This is a label"
   * name: "Label 1"
   * }]
   *
   */
  labels?: Array<{
    _id: string;
    color: string;
    description?: string;
    name: string;
  }>;
  /**
   * An alias for image property. Available only with media
   * components. Media components: video, audio, picture, iframe, img.
   * @type {string}
   * @required
   *
   */
  media?: string;
  /**
   * The height of the media.
   * @type {number}
   * @default 190
   *
   */
  mediaHeight?: number;
  /**
   * The width of the media.
   * @type {number}
   * @default 336
   *
   */
  mediaWidth?: number;
  /**
   * The content of the buttons stack.
   * @type {ReactNode}
   *
   */
  moreCardActions?: React.ReactNode;
  /**
   * The content of the more options popover.
   * @type {ReactNode}
   *
   */
  moreOptionsPopover?: React.ReactNode;
  /**
   * Callback fired when the label is clicked.
   *
   *
   * **Signature**
   * ```
   * function(color: string) => void
   * ```
   *
   * _label_: The clicked label object.
   */
  onClickLabel?: (label: {
    _id: string;
    color: string;
    description?: string;
    name: string;
  }) => void;
  /**
   * Callback fired when the more details button is clicked.
   *
   * **Signature**
   * ```
   * function(event: React.SyntheticEvent<HTMLElement>) => void
   * ```
   *
   * _event_: The event source of the callback.
   */
  onClickMoreDetails?: (event: React.SyntheticEvent<HTMLElement>) => void;
  /**
   * Callback fired when the more options button is clicked.
   *
   * **Signature**
   * ```
   * function(event: React.SyntheticEvent<HTMLElement>) => void
   * ```
   *
   * _event_: The event source of the callback.
   */
  onClickViewFiles?: (event: React.SyntheticEvent<HTMLElement>) => void;
  /**
   * The subheader of the card.
   * @type {string}
   * @required
   * @default subtitle
   */
  subtitle: string;
  /**
   * The title of the card.
   * @type {string}
   * @required
   * @default title
   *
   */
  title: string;
  /**
   * The width of the card.
   * @type {number | string}
   * @default 368
   * @default
   */
  width?: number | string;
}
