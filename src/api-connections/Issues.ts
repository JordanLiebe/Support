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

export async function GetIssues(Filters: IssueFilters) {
  let issues: Issue[] = [];
  const queryParams = new URLSearchParams();
  Object.keys(Filters).forEach((prop) => {
    let value = Object.entries(Filters)
      .filter(([key, value]) => value != undefined && value != '')
      .find(([key, value]) => key === prop);
    if (value) queryParams.append(prop, value[1]);
  });
  let fetchUrl = apiUrl + '/Issue?' + queryParams.toString();
  let response = await fetch(fetchUrl).catch((error) => console.error(error));
  if (response && response.status === 200) {
    issues = await response.json();
  }
  return issues;
}
