import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormHelperText, MenuItem, Modal, Select} from '@material-ui/core';
import Avatar from '../../atoms/Avatar';
import Button from '../../atoms/Button';
import Typography from '../../atoms/Typography';
import {
  getStudiosData,
  getTransactionState
} from '../../../redux/sagas/studios/studios.selectors';
import {
  resetTransaction,
  sellStudioMovie
} from '../../../redux/sagas/studios/studios.actions';
import {ModalContainer, ModalContent} from './style';
import {showFormatedPrice} from '../../../commons/utils';
import {isValidTransaction} from './utils';

const SellMovieModal = ({movie, open, handleClose}) => {
  const dispatch = useDispatch();
  const {studios} = useSelector(getStudiosData);
  const {errorTransaction, fetchedTransaction, fetchingTransaction} =
    useSelector(getTransactionState);
  const [selectedStudio, setSelectedStudio] = useState('');
  const [hasError, setHasError] = useState(false);
  const [buyerStudio, setBuyerStudio] = useState(null);
  const [enabledStudios, setEnabledStudios] = useState([]);

  const confirmTransaction = () => {
    if (!errorTransaction && fetchedTransaction) {
      handleClose(true);
    } else {
      dispatch(sellStudioMovie(movie.id, movie.studioId, buyerStudio.id));
    }
  };

  const handleSelect = ({target}) => {
    const studio = studios.find(({id}) => id === target.value);
    setSelectedStudio(target.value);
    setBuyerStudio(studio);
    setHasError(!isValidTransaction(studio, movie));
  };

  const renderOptions = (option, index) => (
    <MenuItem value={option.id} key={`select-option-${index}`}>
      {option.name}
    </MenuItem>
  );

  useEffect(() => {
    studios.length &&
      setEnabledStudios(
        studios.filter((studio) => studio.id !== movie.studioId)
      );
    return () => {
      dispatch(resetTransaction());
    };
  }, [dispatch, studios, movie]);

  return (
    <Modal open={open} onClose={() => handleClose(false)}>
      <ModalContainer>
        <ModalContent>
          <Typography paragraph style={{alignSelf: 'center'}}>
            Sell this movie
          </Typography>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 24
            }}
          >
            <Avatar name={movie.name} src={movie.img} />
            <Typography paragraph style={{color: '#202022'}}>
              {movie.name}
            </Typography>
          </div>

          <Typography paragraph>
            From studio: <em>{movie.studioName}</em>
          </Typography>

          <div
            style={{
              borderRadius: '25px',
              backgroundColor: '#fff',
              padding: 24,
              display: 'flex'
            }}
          >
            <Typography paragraph>To:</Typography>
            <div
              style={{
                marginLeft: 24,
                width: '100%'
              }}
            >
              <FormHelperText>Select buyer studio:</FormHelperText>
              <Select
                style={{width: '100%'}}
                label="Studio"
                id="studio-select-modal"
                value={selectedStudio}
                onChange={handleSelect}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {enabledStudios.map(renderOptions)}
              </Select>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginTop: 24,
              marginBottom: 24
            }}
          >
            <Typography>
              Movie price: {showFormatedPrice(movie.price)}
            </Typography>
            {buyerStudio && (
              <>
                <Typography style={{color: '#858F99'}}>
                  Studio's budget: {showFormatedPrice(buyerStudio?.money)}
                </Typography>
                <div
                  style={{
                    width: '100%',
                    borderTop: '1px solid #cacaca',
                    marginTop: 12,
                    marginBottom: 12
                  }}
                ></div>
                <Typography style={{color: '#00bbc9'}}>
                  Total: {showFormatedPrice(buyerStudio?.money - movie.price)}
                </Typography>
              </>
            )}
          </div>

          {hasError && buyerStudio && (
            <Typography paragraph style={{color: '#FF5F5D'}}>
              Is not possible to sell this movie to another studio.
            </Typography>
          )}

          {errorTransaction && (
            <>
              <Typography paragraph style={{color: '#FF5F5D'}}>
                There was an error with our services trying to sell this movie.
              </Typography>
              <Typography paragraph style={{color: '#FF5F5D'}}>
                Please try again later.
              </Typography>
            </>
          )}
          {!errorTransaction && fetchedTransaction && (
            <Typography paragraph style={{color: '#858F99'}}>
              The movie was sold successfully.
            </Typography>
          )}

          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            <Button
              size="large"
              style={{
                backgroundColor: 'transparent',
                borderColor: '#00bbc9',
                marginTop: 24
              }}
              onClick={() =>
                handleClose(
                  !errorTransaction && fetchedTransaction ? true : false
                )
              }
            >
              <Typography style={{color: '#00bbc9'}}>Cancel</Typography>
            </Button>
            <Button
              size="large"
              style={{
                backgroundColor:
                  !buyerStudio || hasError || fetchingTransaction
                    ? '#cacaca'
                    : '#00bbc9',
                marginTop: 24,
                marginLeft: 24
              }}
              disabled={!buyerStudio || hasError || fetchingTransaction}
              onClick={confirmTransaction}
            >
              <Typography style={{color: '#fff'}}>
                {!errorTransaction && fetchedTransaction ? 'Close' : 'Confirm'}
              </Typography>
            </Button>
          </div>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};
export default SellMovieModal;
