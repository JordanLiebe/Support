import React, { FC, useEffect, useState } from 'react';
import { Issue, GetIssues, IssueFilters } from '../api-connections/Issues';
import { Table, Form } from 'react-bootstrap';

import '../css/IssueTables.css';

export interface IssueTableProps extends IssueFilters {
  Issues?: Issue[];
}

export const IssueTable: FC<IssueTableProps> = ({
  Issues,
  Subject,
  Priority,
  Category,
}: IssueTableProps) => {
  const [issues, setIssues] = useState<Issue[]>(Issues || []);
  useEffect(() => {
    const getIssuesAsync = async () => {
      setIssues(
        await GetIssues({
          Subject: Subject,
          Priority: Priority,
          Category: Category,
        }),
      );
    };
    getIssuesAsync();
  }, [Subject, Priority, Category]);
  return (
    <Table
      size="md"
      variant="dark"
      striped
      style={{
        fontSize: '20px',
        overflow: 'auto',
        display: 'inline-table',
        tableLayout: 'auto',
      }}
    >
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

export const FilteredIssueTable: FC = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [id, setId] = useState<number>();
  const [subject, setSubject] = useState<string>();
  const [priority, setPriority] = useState<string>();
  const [category, setCategory] = useState<string>();
  return (
    <div className="FIT_Container">
      <div
        className="FIT_Sidebar"
        style={{ display: showSidebar ? '' : 'none' }}
      >
        <div className="FIT_Sidebar_Contents">
          <Form.Group className="FIT_Sidebar_Item">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.currentTarget.value)}
              placeholder="Subject"
            />
          </Form.Group>
          <Form.Group className="FIT_Sidebar_Item">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              value={priority}
              onChange={(e) => setPriority(e.currentTarget.value)}
            >
              <option value="">Nothing Selected</option>
              <option value="HIGH">High</option>
              <option value="MED">Medium</option>
              <option value="LOW">Low</option>
              <option value="INFO">Info</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="FIT_Sidebar_Item">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.currentTarget.value)}
            >
              <option value="">Nothing Selected</option>
              <option>IT-HELP</option>
              <option>MAINTENANCE</option>
            </Form.Control>
          </Form.Group>
        </div>
      </div>
      <div
        className="FIT_Sidebar_Toggle"
        onClick={() => setShowSidebar(!showSidebar)}
      ></div>
      <div className="FIT_Table">
        <IssueTable Subject={subject} Priority={priority} Category={category} />
      </div>
    </div>
  );
};
