const apiUrl = 'https://jmliebe-support-api.azurewebsites.net';

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
  priority: string;
  category: string;
  department: string;
  notes: Note[];
  status: string;
  author: string;
  created: string;
  assignee: string;
  assigned: string;
}

export async function GetIssues() {
  let issues: Issue[] = [];
  let response = await fetch(apiUrl + '/Issue').catch((error) =>
    console.error(error),
  );
  if (response && response.status === 200) {
    issues = await response.json();
  }
  return issues;
}
