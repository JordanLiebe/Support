import React, { FC, useContext } from 'react';
import { Form } from 'react-bootstrap';
import FiltersContext from '../contexts/FiltersContext';

const Sidebar: FC = () => {
  const filters = useContext(FiltersContext);
  return (
    <div className="Sidebar_Container">
      <h3 className="Sidebar_Container_Title">Filters</h3>
      <Form style={{ paddingRight: '25px', paddingLeft: '25px' }}>
        <Form.Group>
          <Form.Label>Subject</Form.Label>
          <Form.Control
            as="input"
            value={filters.subject}
            onChange={(e) => {
              filters.setSubject(e.currentTarget.value);
            }}
            placeholder="Subject"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Priority</Form.Label>
          <Form.Control
            as="input"
            value={filters.priority}
            onChange={(e) => {
              filters.setPriority(e.currentTarget.value);
            }}
            placeholder="Priority"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="input"
            value={filters.category}
            onChange={(e) => {
              filters.setCategory(e.currentTarget.value);
            }}
            placeholder="Category"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Department</Form.Label>
          <Form.Control
            as="input"
            value={filters.department}
            onChange={(e) => {
              filters.setDepartment(e.currentTarget.value);
            }}
            placeholder="Department"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="input"
            value={filters.status}
            onChange={(e) => {
              filters.setStatus(e.currentTarget.value);
            }}
            placeholder="Status"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control
            as="input"
            value={filters.author}
            onChange={(e) => {
              filters.setAuthor(e.currentTarget.value);
            }}
            placeholder="Author"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Assignee</Form.Label>
          <Form.Control
            as="input"
            value={filters.assignee}
            onChange={(e) => {
              filters.setAssignee(e.currentTarget.value);
            }}
            placeholder="Assignee"
          />
        </Form.Group>
      </Form>
      <div></div>
    </div>
  );
};

export default Sidebar;
