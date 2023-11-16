import FeedbackForm from "./FeedbackForm";

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

export default FeedbackForm as React.FC<FeedbackFormProps>;
