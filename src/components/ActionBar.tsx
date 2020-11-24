import React, { FC, useState } from 'react';
import { Button } from 'react-bootstrap';
import CreateIssueModal from './modals/CreateIssueModal';

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
      <CreateIssueModal show={showCreateModal} setShow={setShowCreateModal} />
    </div>
  );
};

export default ActionBar;
