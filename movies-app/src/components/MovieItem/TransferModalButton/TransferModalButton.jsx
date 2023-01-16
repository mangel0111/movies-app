import './TransferModalButton.css';
import { Button, Modal } from '@material-ui/core';
import { Fragment, useState } from 'react';

const TransferModalButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Button />
      <Modal>
        <p>---</p>
      </Modal>
    </Fragment>
  );
};

export default TransferModalButton;
