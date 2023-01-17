import './TransferModalButton.css';
import { Fragment, useState } from 'react';
import { Modal, Box } from '@mui/material';
import TransferButton from './TransferButton';
import ModalContent from './ModalContent';

const TransferModalButton = ({ movie }) => {
  const [open, setOpen] = useState(false);

  const onModalOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <TransferButton onClick={onModalOpen} />
      <Modal open={open} onClose={onClose}>
        <Box className="modal-box">
          {open && <ModalContent movie={movie} onClose={onClose} />} {/* tiny optimization here */}
        </Box>
      </Modal>
    </Fragment>
  );
};

export default TransferModalButton;
