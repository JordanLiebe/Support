import {
  Issue,
  IssueFilters,
  CreateIssue,
  UpdateIssue,
  Note,
  CreateNote,
} from '../interfaces/Issue';

export const GetIssue = async (issueId: number, token?: string) => {
  let issue: Issue | undefined = undefined;
  let fetchUrl = process.env.REACT_APP_API_URL + '/Issue/' + issueId;
  let response = await fetch(fetchUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token !== '' ? token : ''}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).catch((error) => console.error(error));
  if (response && response.status === 200) {
    issue = await response.json();
  }
  return issue;
};

export const GetNotes = async (issueId: number, token: string) => {
  let issue: Issue | undefined = undefined;
  let fetchUrl = process.env.REACT_APP_API_URL + '/Issue/' + issueId + '/Notes';
  let response = await fetch(fetchUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token !== '' ? token : ''}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).catch((error) => console.error(error));
  if (response && response.status === 200) {
    issue = await response.json();
  }
  return issue;
};

export async function GetIssues(Filters: IssueFilters, token?: string) {
  let issues: Issue[] = [];
  const queryParams = new URLSearchParams();
  Object.keys(Filters).forEach((prop) => {
    let value = Object.entries(Filters)
      .filter(([key, value]) => value !== undefined && value !== '')
      .find(([key, value]) => key === prop);
    if (value) queryParams.append(prop, value[1]);
  });
  let fetchUrl =
    process.env.REACT_APP_API_URL + '/Issue?' + queryParams.toString();
  let response = await fetch(fetchUrl, {
    headers: {
      Authorization: `Bearer ${token !== '' ? token : ''}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).catch((error) => console.error(error));
  if (response && response.status === 200) {
    issues = await response.json();
  }
  return issues;
}

export async function PostIssues(Issue: CreateIssue, token?: string) {
  const postUrl = process.env.REACT_APP_API_URL + '/Issue';
  let postResponse = await fetch(postUrl, {
    method: 'POST',
    body: JSON.stringify(Issue),
    headers: {
      Authorization: `Bearer ${token !== '' ? token : ''}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (postResponse && postResponse.status === 200) {
    let postResponseBody: Issue = await postResponse.json();
  }
}

export async function PutIssues(Id: number, Issue: UpdateIssue, token: string) {
  const postUrl = process.env.REACT_APP_API_URL + '/Issue/' + Id;
  let postResponse = await fetch(postUrl, {
    method: 'PUT',
    body: JSON.stringify(Issue),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (postResponse && postResponse.status === 200) {
    let postResponseBody: Issue = await postResponse.json();
  }
}

export const PostNote = async (Note: CreateNote, token: string) => {
  const postUrl = process.env.REACT_APP_API_URL + '/Note';
  let postResponse = await fetch(postUrl, {
    method: 'POST',
    body: JSON.stringify(Note),
    headers: {
      Authorization: `Bearer ${token !== '' ? token : ''}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (postResponse && postResponse.status === 200) {
    let postResponseBody: Note = await postResponse.json();
  }
};

export const DeleteNote = async (id: number, token: string) => {
  const deleteUrl = process.env.REACT_APP_API_URL + '/Note/' + id;
  let deleteResponse = await fetch(deleteUrl, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token !== '' ? token : ''}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  console.log(deleteResponse);
  if (deleteResponse && deleteResponse.status === 200) {
    let postResponseBody: Note = await deleteResponse.json();
  }
};
