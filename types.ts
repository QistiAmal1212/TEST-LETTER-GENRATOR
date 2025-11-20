export interface UserProfile {
  fullName: string;
  position: string;
  companyName: string;
  email: string;
  phone: string;
  recipientName: string;
  recipientTitle: string;
  recipientCompany: string;
  customNotes: string;
}

export interface DocumentAnalysis {
  type: string;
  sentiment: 'positive' | 'neutral' | 'negative' | 'warning';
  suggestions: string[];
}

export enum EditorMode {
  EDIT = 'EDIT',
  PREVIEW = 'PREVIEW'
}
