
export type RequestStatus = 'Pending' | 'Approved' | 'Denied';
export type RequestType = 'Full Day' | 'Half Day' | 'Medical' | 'Personal';

// Define the supported model types for Gemini API following the latest naming conventions
export enum ModelType {
  FLASH = 'gemini-3-flash-preview',
  PRO = 'gemini-3-pro-preview'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Employee' | 'Manager';
  hireDate: string; // ISO string
  jobTitle: string;
}

export interface PTORequest {
  id: string;
  userId: string;
  userName: string;
  startDate: string;
  endDate: string;
  type: RequestType;
  hours: number;
  status: RequestStatus;
  reason: string;
  createdAt: string;
}

export interface PTOBalance {
  accrued: number;
  used: number;
  available: number;
  lastResetYear: number;
}
