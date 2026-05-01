export interface Question {
  id?: number;
  text: string;
  type: "boolean" | "input" | "checkbox";
  options?: string | null;
  optionsString?: string;
}

export interface Quiz {
  id: number;
  title: string;
  questions: Question[];
  _count?: {
    questions: number;
  };
}
