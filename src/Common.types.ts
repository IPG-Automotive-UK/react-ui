// File interface
export interface File {
  filename: string;
  path: string;
}

// Label interface
export interface Label {
  _id: string;
  color: string;
  description?: string;
  name: string;
}
