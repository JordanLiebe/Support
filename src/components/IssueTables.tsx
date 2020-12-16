import React, { FC, useContext, useEffect, useState } from 'react';
import { GetIssues } from '../api-connections/Issues';
import { Issue, IssueFilters, CreateIssue } from '../interfaces/Issue';
import { Table, Toast, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';

import '../css/IssueTables.css';
import AuthenticationContext from '../contexts/AuthenticationContext';
import FiltersContext from '../contexts/FiltersContext';
import Sidebar from './Sidebar';
import ActionBar from './ActionBar';
import UpdateIssueModal from './modals/UpdateIssueModal';

export interface IssueTableProps extends IssueFilters {
  Issues?: Issue[];
}

export const IssueTable: FC<IssueTableProps> = ({
  Issues,
}: IssueTableProps) => {
  // Standard component state //
  const [updated, setUpdated] = useState<boolean>(false);
  const [issues, setIssues] = useState<Issue[]>(Issues || []);

  // Update Modal State //
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [updateIssueId, setUpdateIssueId] = useState<number>(-1);

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

  const getIssuesAsync = async () => {
    setIssues(
      await GetIssues(
        {
          Subject: subject,
          Priority: priority,
          Category: category,
          Department: department,
          Status: status,
          Author: author,
        },
        auth.jwt,
      ),
    );
    setUpdated(true);
  };

  useEffect(() => {
    getIssuesAsync();
  }, [subject, priority, category, status, updated]);

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
        setDepartment: (department: string) => {
          setDepartment(department);
        },
        status: status,
        setStatus: (status: string) => {
          setStatus(status);
        },
        author: author,
        setAuthor: (author: string) => {
          setAuthor(author);
        },
        created: created,
        setCreated: (created: Date) => {
          setCreated(created);
        },
        assignee: assignee,
        setAssignee: (assignee: string) => {
          setAssignee(assignee);
        },
        assigned: assigned,
        setAssigned: (assigned: Date) => {
          setAssigned(assigned);
        },
      }}
    >
      <div className="IT_Filter_Container">
        <Sidebar />
        <div className="IT_Container">
          <ActionBar onUpdate={getIssuesAsync} />
          <Table size="md" variant="dark" striped className="IT_Table">
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
                  <tr
                    key={issue.id}
                    onClick={() => {
                      setShowUpdateModal(true);
                      setUpdateIssueId(issue.id);
                    }}
                    className="IT_Row"
                  >
                    <th scope="row">{issue.id}</th>
                    <td>{issue.subject}</td>
                    <td>{issue.priority}</td>
                    <td>{issue.category}</td>
                    <td>{issue.department}</td>
                    <td>
                      {issue.notes !== null &&
                        issue.notes
                          .filter((note) => note !== null)
                          .map((note) => {
                            let date = new Date(note.created);
                            return (
                              <OverlayTrigger
                                key={'OT_Trig_' + note.id}
                                placement="right"
                                overlay={
                                  <Tooltip
                                    key={'TT_' + note.id}
                                    id={`tooltip-right`}
                                  >
                                    <small>{note.author}</small>
                                    <br />
                                    <small>{date.toLocaleString()}</small>
                                  </Tooltip>
                                }
                              >
                                <Toast
                                  key={'TO_' + note.id}
                                  style={{ color: 'black', margin: 'auto' }}
                                >
                                  <Toast.Body>{note.content}</Toast.Body>
                                </Toast>
                              </OverlayTrigger>
                            );
                          })}
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
      <UpdateIssueModal
        show={showUpdateModal}
        setShow={setShowUpdateModal}
        issueId={updateIssueId}
        onUpdate={getIssuesAsync}
      />
    </FiltersContext.Provider>
  );
};
