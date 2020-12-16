import React, { FC, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import CreateIssueModal from './modals/CreateIssueModal';

interface ActionBarProps {
  onUpdate: () => void;
}

const ActionBar: FC<ActionBarProps> = ({ onUpdate }) => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  useEffect(() => {
    onUpdate();
  }, [showCreateModal]);
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
