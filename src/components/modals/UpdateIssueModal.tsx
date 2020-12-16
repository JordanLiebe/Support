import React, { FC, useContext, useEffect, useState } from 'react';
import { Button, Modal, Form, Toast, Spinner } from 'react-bootstrap';
import {
  GetIssue,
  PutIssues,
  PostNote,
  DeleteNote,
} from '../../api-connections/Issues';
import { Issue, Note, UpdateIssue, CreateNote } from '../../interfaces/Issue';
import AuthenticationContext from '../../contexts/AuthenticationContext';

interface UpdateIssueModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
  onUpdate: () => void;
  issueId: number;
}

const UpdateIssueModal: FC<UpdateIssueModalProps> = ({
  show,
  setShow,
  onUpdate,
  issueId,
}) => {
  // Form Fields //
  const [id, setId] = useState<number>(0);
  const [subject, setSubject] = useState<string>('');
  const [priority, setPriority] = useState<'LOW' | 'MED' | 'HIGH'>('LOW');
  const [category, setCategory] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [status, setStatus] = useState<string>('');

  // Form Add Note Extension //
  const [showAddNote, setShowAddNote] = useState<boolean>(false);
  const [newNote, setNewNote] = useState<string>('');

  // Form State //
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [createModalErrors, setCreateModalErrors] = useState<string[]>([]);
  const auth = useContext(AuthenticationContext);

  // Response State //
  const [response, setResponse] = useState<string>('');

  useEffect(() => {
    getIssueAsync();
  }, [issueId, show]);

  function sleep(delay: number) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
  }

  const getIssueAsync = async () => {
    let token: string = auth.jwt;
    let issue: Issue | undefined = await GetIssue(issueId, token);
    if (issue) {
      setId(issue.id);
      setSubject(issue.subject);
      setDepartment(issue.department);
      switch (issue.priority) {
        case 'LOW':
          setPriority('LOW');
          break;
        case 'MED':
          setPriority('MED');
          break;
        case 'HIGH':
          setPriority('HIGH');
          break;
      }
      switch (issue.department) {
        case 'Information Technology':
          setCategories([
            'Accounts',
            'Software Engineering',
            'Desktop',
            'Remote',
          ]);
          break;
        case 'Maintenance':
          setCategories(['Moving', 'Custodial', 'Painting']);
          break;
        default:
          setCategories([]);
          break;
      }
      setCategory(issue.category);
      setNotes(issue.notes);
    }
  };

  const postNewNote = async () => {
    let token: string = auth.jwt;
    let note: CreateNote = {
      issueId: issueId,
      content: newNote,
      flag: false,
      author: 'Test',
    };
    let response = await PostNote(note, token);
    onUpdate();
  };

  const updateIssue = async () => {
    let token: string = auth.jwt;
    let issue: UpdateIssue = {
      subject: subject,
      priority: priority,
      category: category,
      department: department,
      status: status,
    };
    let response = await PutIssues(id, issue, token);
    setShow(false);
    onUpdate();
  };

  return (
    <Modal show={show}>
      <Modal.Header closeButton onHide={() => setShow(!show)}>
        <h4>Update Issue</h4>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Form.Group>
            <Form.Label>Subject</Form.Label>
            <Form.Control
              as="input"
              value={subject}
              onChange={(e) => {
                setSubject(e.currentTarget.value);
              }}
              placeholder="Subject"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Department</Form.Label>
            <Form.Control
              as="select"
              value={department}
              onChange={(e) => {
                setDepartment(e.currentTarget.value);
                switch (e.currentTarget.value) {
                  case 'Information Technology':
                    setCategories([
                      'Accounts',
                      'Software Engineering',
                      'Desktop',
                      'Remote',
                    ]);
                    break;
                  case 'Maintenance':
                    setCategories(['Moving', 'Custodial', 'Painting']);
                    break;
                  default:
                    setCategories([]);
                    break;
                }
              }}
            >
              <option>Human Resources</option>
              <option>Information Technology</option>
              <option>Maintenance</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => {
                setCategory(e.currentTarget.value);
              }}
              placeholder="Category"
              disabled={categories.length === 0}
            >
              {categories &&
                categories.map((cat, i) => (
                  <option key={'category_create_' + i}>{cat}</option>
                ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Priority</Form.Label>
            <Form.Control
              as="select"
              value={priority}
              onChange={(e) => {
                switch (e.currentTarget.value) {
                  case 'LOW':
                    setPriority('LOW');
                    break;
                  case 'MED':
                    setPriority('MED');
                    break;
                  case 'HIGH':
                    setPriority('HIGH');
                    break;
                }
              }}
            >
              <option value="LOW">Low</option>
              <option value="MED">Medium</option>
              <option value="HIGH">High</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Notes</Form.Label>
            {notes &&
              notes.length > 0 &&
              notes
                .filter((e) => e !== null)
                .map((note, i) => {
                  return (
                    <Toast
                      key={'Form_Note_' + i}
                      style={{ margin: '15px auto 15px auto' }}
                      onClose={() => {
                        DeleteNote(note.id, auth.jwt);
                        let notesTemp = notes.filter((m) => m.id !== note.id);
                        setNotes(notesTemp);
                      }}
                    >
                      <Toast.Header
                        closeButton={
                          auth.user && note && auth.user.uuid === note.author
                        }
                      >
                        <strong>Note: {note && note.id}</strong>
                      </Toast.Header>
                      <Toast.Body>{note.content}</Toast.Body>
                    </Toast>
                  );
                })}
          </Form.Group>
          <Form.Group>
            {showAddNote ? (
              <div>
                <Form.Control
                  as="textarea"
                  value={newNote}
                  onChange={(e) => {
                    setNewNote(e.currentTarget.value);
                  }}
                  placeholder="Note"
                />
                <Button
                  variant="link"
                  onClick={() => {
                    postNewNote();
                    sleep(2000);
                    getIssueAsync();
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="link"
                  onClick={() => setShowAddNote(!showAddNote)}
                >
                  Hide
                </Button>
              </div>
            ) : (
              <Button
                variant="link"
                onClick={() => setShowAddNote(!showAddNote)}
              >
                Add
              </Button>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => {
                setStatus(e.currentTarget.value);
              }}
            >
              <option value="NEW">New</option>
              <option value="PENDING">Pending</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <Button variant="primary" type="submit" onClick={() => updateIssue()}>
            Update
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateIssueModal;
