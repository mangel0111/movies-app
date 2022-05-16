import React from 'react';
import Avatar from 'components/avatar';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { globalApp } from 'redux/reducers/global-app';
import { selectSelectedMovie, selectSelectedStudio } from 'redux/selectors/global-app';
import { selectMoviesData } from 'redux/selectors/movies';
import { selectStudiosData } from 'redux/selectors/studios';
import {
  canBuyMovie,
  getBuyerStudios, getFormattedPrice, getStudioDataFromMovie,
} from 'utils/helpers';
import FormControl from 'components/styled/form-control';
import {
  Button, IconButton, MenuItem, Select, Typography,
} from '@material-ui/core';
import Check from '@material-ui/icons/Check';
import Footer from 'components/styled/footer';
import { movies } from 'redux/reducers/movies';
import StyledDrawer from 'components/styled/drawer';
import Cancel from '@material-ui/icons/Cancel';
import DialogTitle from 'components/styled/dialog-title';
import { MOVIE_PRICE, SELL, STUDIO_MONEY } from 'utils/constants';
import Box from 'components/styled/box';
import BoxContainer from 'components/styled/box-container';
import PricesContainer from 'components/styled/prices-container';
import PriceSpan from 'components/styled/price-span';

const Drawer = () => {
  const dispatch = useDispatch();
  const selectedMovie = useSelector(selectSelectedMovie, shallowEqual);
  const selectedStudio = useSelector(selectSelectedStudio, shallowEqual);
  const moviesData = useSelector(selectMoviesData, shallowEqual);
  const studiosData = useSelector(selectStudiosData, shallowEqual);

  const movie = moviesData.find((item) => item.id === selectedMovie);
  const studio = studiosData.find((item) => item.id === selectedStudio);
  const canBuy = canBuyMovie(movie, studio);

  const handleClose = () => {
    dispatch(globalApp.clearSelectedMovie());
    dispatch(globalApp.clearSelectedStudio());
  };

  const handleStudioChange = ({ target: { value } }) => {
    dispatch(globalApp.setSelectedStudio(value));
  };

  const handleTransferClick = () => {
    dispatch(movies.transfer(movie));
  };

  return (
    <StyledDrawer
      anchor="left"
      open={!!selectedMovie}
      onClose={handleClose}
    >
      <DialogTitle disableTypography>
        <IconButton onClick={handleClose}>
          <Cancel />
        </IconButton>
      </DialogTitle>
      <Box $isDrawer>
        <BoxContainer>
          <Avatar
            isDrawer
            name={movie?.name}
            img={movie?.img}
          />
          <Typography variant="h6">
            {`${movie?.name} `}
          </Typography>
        </BoxContainer>
        <BoxContainer>
          <Typography>
            Sell from
            {' '}
            <strong>
              {getStudioDataFromMovie(movie, studiosData)?.name}
            </strong>
            {' '}
            to:
          </Typography>
          <FormControl>
            <Select
              labelId="select-studio-label"
              id="select-studio"
              value={selectedStudio}
              onChange={handleStudioChange}
              data-testid="select-studio"
            >
              {getBuyerStudios(movie, studiosData).map((std) => (
                <MenuItem
                  key={std.id}
                  value={std.id}
                >
                  {std.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <PricesContainer>
            <Typography>
              {`${MOVIE_PRICE} `}
              <PriceSpan>
                {getFormattedPrice(movie?.price)}
              </PriceSpan>
            </Typography>
            {studio && (
            <Typography>
              {`${STUDIO_MONEY} `}
              <PriceSpan $color={!canBuy && 'red'}>
                {getFormattedPrice(studio.money)}
              </PriceSpan>
            </Typography>
            )}
          </PricesContainer>
        </BoxContainer>
        <Footer>
          <Button
            disabled={!selectedStudio || !canBuy}
            variant="contained"
            endIcon={<Check />}
            onClick={handleTransferClick}
            data-testid="sell-button"
          >
            {SELL}
          </Button>
        </Footer>
      </Box>
    </StyledDrawer>
  );
};

export default Drawer;
