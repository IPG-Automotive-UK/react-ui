export type FeedbackFormProps = {
  dialogPosition?: "rightTop" | "bottomLeft" | "leftTop" | "leftBottom";
  onSubmit?: (data: {
    description: string;
    sentiment: string;
    title: string;
    url: string;
  }) => void;
  open?: boolean;
};

declare const FeedbackForm: React.FC<FeedbackFormProps>;

export default FeedbackForm;
