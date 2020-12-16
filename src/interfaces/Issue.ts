export interface Note {
  id: number;
  issueId: number;
  content: string;
  flag: boolean;
  author: string;
  created: string;
}

export interface Issue {
  id: number;
  subject: string;
  priority: 'LOW' | 'MED' | 'HIGH';
  category: string;
  department: string;
  notes: Note[];
  status: string;
  author: string;
  created: Date;
  assignee: string;
  assigned: Date;
}

export interface CreateIssue {
  subject: string;
  priority: string;
  category: string;
  department: string;
  initial_note: string;
}

export interface UpdateIssue {
  subject: string;
  priority: string;
  category: string;
  department: string;
  status: string;
}

export interface CreateNote {
  issueId: number;
  content: string;
  flag: boolean;
  author: string;
}

export interface IssueFilters {
  Id?: number | null;
  Subject?: string | null;
  Priority?: string | null;
  Category?: string | null;
  Department?: string | null;
  Status?: string | null;
  Author?: string | null;
  Assignee?: string | null;
}
