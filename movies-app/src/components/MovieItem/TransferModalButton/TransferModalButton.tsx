import './TransferModalButton.css';

import { Box, Modal } from '@mui/material';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';

import ModalContent from './ModalContent';
import TransferButton from './TransferButton';

const TransferModalButton = ({ movie }) => {
  const { studios } = useSelector((state) => state.studios);
  const [open, setOpen] = useState(false);

  const onModalOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const canBeBought = studios.some((studio) => studio.money >= movie.price);
  if (!canBeBought) return null;

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
