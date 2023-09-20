// File type
export type File = {
  filename: string;
  path: string;
};

// Label type
export type Label = {
  _id: string;
  color: string;
  description?: string;
  name: string;
};
