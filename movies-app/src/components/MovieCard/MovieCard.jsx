import "./MovieCard.css";
import { Avatar, Card, Grid, Typography } from "@mui/material";
import { defaultAvatar } from "../../api/resources";
import SellMovieModal from "../SellMovieModal";

function MovieCard({ movie, studios, handleSellMovie }) {
  return (
    <Grid item key={movie.name} xs={12} sm={6} lg={4}>
      <Card className={"mv-card"}>
        <Avatar
          className={"mv-avatar"}
          imgProps={{ referrerPolicy: "no-referrer" }}
          alt={movie.name}
          src={movie.img ? movie.img : defaultAvatar}
        />
        <div>
          <Typography style={{ display: "inline-block" }}>
            {movie.name + " "}
          </Typography>
        </div>
        <Typography>{movie.studio}</Typography>
        <SellMovieModal
          movie={movie}
          studios={studios}
          handleSubmit={handleSellMovie}
        />
      </Card>
    </Grid>
  );
}

export default MovieCard;
