import { Box, Modal } from '@mui/material';
import { Fragment, useState } from 'react';
import tw from 'twin.macro';

import { useAppSelector } from '../../../store';
import { MovieExt } from '../../../store/movies/reducer';
import ModalContent from './ModalContent';
import TransferButton from './TransferButton';

const StyledBox = tw(Box)`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
  w-[90%] sm:w-[400px] max-w-[400px] bg-white border-2 border-black p-5`;

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
        <StyledBox>
          {open && <ModalContent movie={movie} onClose={onClose} />} {/* tiny optimization here */}
        </StyledBox>
      </Modal>
    </Fragment>
  );
};

export default TransferModalButton;
