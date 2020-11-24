import React, { FC, useContext, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Issue, PostIssues } from '../../api-connections/Issues';
import AuthenticationContext from '../../contexts/AuthenticationContext';
interface UpdateIssueModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
  current: Issue;
}

const UpdateIssueModal: FC<UpdateIssueModalProps> = ({
  show,
  setShow,
  current,
}) => {
  const [subject, setSubject] = useState<string>(current.subject);
  const [priority, setPriority] = useState<'LOW' | 'MED' | 'HIGH'>(
    current.priority,
  );
  const [category, setCategory] = useState<string>(current.category);
  const [categories, setCategories] = useState<string[]>([]);
  const [department, setDepartment] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [createModalErrors, setCreateModalErrors] = useState<string[]>([]);
  const auth = useContext(AuthenticationContext);

  const postNewIssue = () => {
    const postNewIssueAsync = async () => {
      let token: string = auth.jwt;
      await PostIssues(
        {
          subject: subject,
          priority: priority,
          category: category,
          department: department,
          initial_note: note,
        },
        token,
      );
    };
    postNewIssueAsync();
  };

  return (
    <Modal show={show}>
      <Modal.Header closeButton onHide={() => setShow(!show)}>
        <h4>Create Issue</h4>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            postNewIssue();
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
            <Form.Label>Note</Form.Label>
            <Form.Control
              as="textarea"
              value={note}
              onChange={(e) => {
                setNote(e.currentTarget.value);
              }}
              placeholder="Note"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => postNewIssue()}>Update</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateIssueModal;
