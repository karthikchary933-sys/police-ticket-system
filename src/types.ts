export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';
export type Category = 'Hardware' | 'Software' | 'Network' | 'Access' | 'Application';
export type Status = 'Open' | 'Assigned' | 'In Progress' | 'Waiting for User' | 'Escalated' | 'Resolved' | 'Closed' | 'Reopened';

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
  isInternal: boolean;
}

export interface Ticket {
  id: string;
  officerName: string;
  department: string;
  contactEmail: string;
  category: Category;
  priority: Priority;
  deviceType: string;
  description: string;
  status: Status;
  createdAt: string;
  screenshot?: string;
  assignedTo?: string;
  rootCause?: string;
  stepsTaken?: string;
  resolutionNotes?: string;
  workNotes?: string;
  resolvedAt?: string;
  resolvedBy?: string;
  comments: Comment[];
  history: {
    date: string;
    action: string;
    user: string;
  }[];
}

export interface DashboardStats {
  total: number;
  open: number;
  assigned: number;
  inProgress: number;
  waiting: number;
  escalated: number;
  resolved: number;
  closed: number;
  avgResolutionTime: string;
  slaCompliance: number;
}
