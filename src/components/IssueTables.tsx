import React, { FC, useContext, useEffect, useState } from 'react';
import { Issue, GetIssues, IssueFilters } from '../api-connections/Issues';
import { Table } from 'react-bootstrap';

import '../css/IssueTables.css';
import AuthenticationContext from '../contexts/AuthenticationContext';
import FiltersContext from '../contexts/FiltersContext';
import Sidebar from './Sidebar';
import ActionBar from './ActionBar';

export interface IssueTableProps extends IssueFilters {
  Issues?: Issue[];
}

export const IssueTable: FC<IssueTableProps> = ({
  Issues,
  Subject,
  Priority,
  Category,
}: IssueTableProps) => {
  // Standard component state //
  const [updated, setUpdated] = useState<boolean>(false);
  const [issues, setIssues] = useState<Issue[]>(Issues || []);

  // Filters State //
  const [subject, setSubject] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [created, setCreated] = useState<Date>(new Date());
  const [assignee, setAssignee] = useState<string>('');
  const [assigned, setAssigned] = useState<Date>(new Date());

  // Contexts //
  const auth = useContext(AuthenticationContext);
  const filters = useContext(FiltersContext);

  useEffect(() => {
    const getIssuesAsync = async () => {
      setIssues(
        await GetIssues(
          {
            Subject: Subject,
            Priority: Priority,
            Category: Category,
          },
          'Bearer ' + auth.jwt,
        ),
      );
      setUpdated(true);
    };
    getIssuesAsync();
  }, [Subject, Priority, Category, updated]);
  return (
    <FiltersContext.Provider
      value={{
        subject: subject,
        setSubject: (subject: string) => {
          setSubject(subject);
        },
        priority: priority,
        setPriority: (priority: string) => {
          setPriority(priority);
        },
        category: category,
        setCategory: (category: string) => {
          setCategory(category);
        },
        department: department,
        setDepartment: (department: string) => {},
        status: status,
        setStatus: (status: string) => {
          setStatus(status);
        },
        author: author,
        setAuthor: (author: string) => {},
        created: created,
        setCreated: (created: Date) => {},
        assignee: assignee,
        setAssignee: (assignee: string) => {},
        assigned: assigned,
        setAssigned: (assigned: Date) => {},
      }}
    >
      <div className="IT_Filter_Container">
        <Sidebar />
        <div className="IT_Container">
          <ActionBar />
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
                            .map((note) => (
                              <li key={note.id}>{note.content}</li>
                            ))}
                      </ul>
                    </td>
                    <td>{issue.status}</td>
                    <td>{issue.author}</td>
                    <td>{new Date(issue.created).toLocaleString()}</td>
                    <td>{issue.assignee}</td>
                    <td>{new Date(issue.assigned).toLocaleString()}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </FiltersContext.Provider>
  );
};
