import "./MovieCard.css";
import { Avatar, Card, Grid, Typography } from "@material-ui/core";
import { defaultAvatar } from "../../api/resources";

function MovieCard({ movie, studio }) {
  return (
    <Grid key={movie.name} item xs={12} sm={6} lg={4}>
      <Card className={'mv-card'}>
        <Avatar
          className={'mv-avatar'}
          imgProps={{ referrerPolicy: "no-referrer" }}
          alt={movie.name}
          src={movie.img ? movie.img : defaultAvatar}
        />
        <div>
          <Typography style={{ display: "inline-block" }}>
            {movie.name + " "}
          </Typography>
        </div>
        <Typography>{studio}</Typography>
      </Card>
    </Grid>
  );
}

export default MovieCard;
