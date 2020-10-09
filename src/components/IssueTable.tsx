import React, { FC, useEffect, useState } from 'react';
import { Note, Issue, GetIssues } from '../api-connections/Issues';
import { Table } from 'react-bootstrap';

export interface IssueTableProps {}

const IssueTable: FC<IssueTableProps> = () => {
  const [issues, setIssues] = useState<Issue[]>();
  useEffect(() => {
    const getIssuesAsync = async () => {
      let issuesList = await GetIssues();
      setIssues(issuesList);
    };
    getIssuesAsync();
  }, []);
  return (
    <Table size="sm" variant="dark" striped style={{ fontSize: '20px' }}>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Subject</th>
          <th scope="col">Priority</th>
          <th scope="col">Category</th>
          <th scope="col">Department</th>
          <th scope="col">Notes</th>
          <th scope="col">Status</th>
          <th scope="col">Author</th>
          <th scope="col">Created</th>
          <th scope="col">Assignee</th>
          <th scope="col">Assigned</th>
        </tr>
      </thead>
      <tbody>
        {issues &&
          issues.map((issue) => (
            <tr key={issue.id} onClick={() => alert(issue.id)}>
              <th scope="row">{issue.id}</th>
              <td>{issue.subject}</td>
              <td>{issue.priority}</td>
              <td>{issue.category}</td>
              <td>{issue.department}</td>
              <td>
                <ul>
                  {issue.notes !== null &&
                    issue.notes
                      .filter((note) => note !== null)
                      .map((note) => <li key={note.id}>{note.content}</li>)}
                </ul>
              </td>
              <td>{issue.status}</td>
              <td>{issue.author}</td>
              <td>{issue.created}</td>
              <td>{issue.assignee}</td>
              <td>{issue.assigned}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default IssueTable;
