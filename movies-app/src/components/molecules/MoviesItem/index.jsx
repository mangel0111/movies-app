import React from 'react';
import Grid from '@material-ui/core/Grid';
import {StyledCard, StyledContent} from './style';
import Avatar from '../../atoms/Avatar';
import Typography from '../../atoms/Typography';
import {showFormatedPrice} from '../../../commons/utils';

const MoviesItem = ({item, selectedMovie, handleClickItem}) => {
  const handleClickMovie = (movie) => {
    handleClickItem && handleClickItem(movie);
  };

  return (
    <Grid item xs={12} sm={6} lg={4} key={`grid-item-${item.id}`}>
      <StyledCard
        id={`movie-card-${item.id}`}
        selected={selectedMovie?.id === item.id}
        onClick={() => handleClickMovie(item)}
      >
        <Avatar name={item.name} src={item.img} />
        <StyledContent>
          <div>
            <Typography style={{color: '#202022'}}>{item.name}</Typography>
            <Typography
              style={{
                color: '#858F99'
              }}
            >
              {item.studioName}
            </Typography>
          </div>
          <Typography
            style={{
              color: '#00BBC9',
              alignSelf: 'flex-end',
              display: 'flex'
            }}
          >
            {showFormatedPrice(item.price)}
          </Typography>
        </StyledContent>
      </StyledCard>
    </Grid>
  );
};
export default MoviesItem;
