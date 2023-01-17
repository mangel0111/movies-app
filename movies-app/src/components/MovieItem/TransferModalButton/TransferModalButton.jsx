import './TransferModalButton.css';
import { Fragment, useState } from 'react';
import { Modal, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import TransferButton from './TransferButton';
import ModalContent from './ModalContent';

const TransferModalButton = ({ movie }) => {
  const { studios } = useSelector((state) => state.studios);
  const [open, setOpen] = useState(false);

  const onModalOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const canBeBought = studios.some(studio => studio.money >= movie.price);
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
