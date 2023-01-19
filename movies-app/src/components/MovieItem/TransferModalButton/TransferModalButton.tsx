import './TransferModalButton.css';

import { Box, Modal } from '@mui/material';
import { Fragment, useState } from 'react';

import { useAppSelector } from '../../../store';
import { MovieExt } from '../../../store/movies/reducer';
import ModalContent from './ModalContent';
import TransferButton from './TransferButton';

type Props = { movie: MovieExt };
const TransferModalButton: React.FC<Props> = ({ movie }) => {
  const { studios } = useAppSelector((state) => state.studios);
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
