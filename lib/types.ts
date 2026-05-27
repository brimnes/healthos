export type Status = "mint" | "amber" | "coral";

export type DocumentStatus =
  | "uploaded"
  | "processing"
  | "requires_review"
  | "completed"
  | "error";

export type Marker = {
  code: string;
  name: string;
  group: string;
  unit: string;
  range: [number, number];
  history: number[];
  status: Status;
  value?: number;
};

export type MedicalDocument = {
  id: number;
  name: string;
  lab: string;
  date: string;
  type: "pdf" | "docx" | "img";
  size: string;
  markers: number;
  status: DocumentStatus;
  documentType: string;
};
