import { Avatar, Card, Grid, Typography } from '@mui/material';
import tw from 'twin.macro';

import { MovieExt } from '../../store/movies/reducer';
import TransferModalButton from './TransferModalButton';

const defaultAvatar =
  'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg';

const StyledAvatar = tw(Avatar)`m-[5px] h-[60px] w-[60px] sm:h-[280px] sm:w-[280px]`;

const StyledCard = tw(Card)`border border-gray-500 rounded m-0.5 p-[5px]
  flex flex-row items-center justify-start sm:flex-col sm:justify-center`;

const DivButton = tw.div`h-10 ml-auto sm:m-[5px]`;

const ImgNotFound = tw.img`w-full h-full object-cover`;

type Props = { movie: MovieExt };
const MovieItem: React.FC<Props> = ({ movie }) => (
  <Grid data-testid="griditem" item xs={12} sm={6} lg={4}>
    <StyledCard>
      <StyledAvatar alt={movie.name} src={movie.img} imgProps={{ referrerPolicy: 'no-referrer' }}>
        <ImgNotFound alt="Not found" src={defaultAvatar} />
      </StyledAvatar>
      <div tw="p-[5px]">
        <Typography>
          {movie.name + ' '}
          <span tw="font-bold">{movie.price > 100000 ? '' : `$${movie.price}`}</span>
        </Typography>
      </div>
      <Typography>{movie.studio}</Typography>
      <DivButton>
        <TransferModalButton movie={movie} />
      </DivButton>
    </StyledCard>
  </Grid>
);

export default MovieItem;
