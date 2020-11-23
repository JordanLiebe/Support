import React, { FC, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const ActionBar: FC = () => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  return (
    <div className="ActionBar_Container">
      <Button
        className="ActionBar_Button"
        onClick={() => {
          setShowCreateModal(!showCreateModal);
        }}
      >
        Create
      </Button>
      <Modal show={showCreateModal}>
        <Modal.Header>Create Issue</Modal.Header>
        <Modal.Body>
          <Form></Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShowCreateModal(!showCreateModal);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ActionBar;
