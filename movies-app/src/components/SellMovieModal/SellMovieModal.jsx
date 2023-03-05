import { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function SellMovieModal({ isOpen, closeModal, movie, studios, onSubmit }) {
  const [selectedStudio, setSelectedStudio] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(movie.id, selectedStudio);
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h3">
            Sell Movie
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Movie: {movie?.name}
            <br />
            Price: ${movie?.price}
            <br /> <br />
            Please select the studio you want to sell the movie to
          </Typography>

          <Autocomplete
            value={selectedStudio}
            onChange={(_, value) => setSelectedStudio(value)}
            disablePortal
            sx={{ mt: 2 }}
            getOptionLabel={(option) => option?.name}
            options={studios}
            renderInput={(params) => <TextField {...params} label="Studio" />}
          />

          <Stack
            direction={"row"}
            spacing={4}
            sx={{ justifyContent: "right", mt: 2 }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={closeModal}
            >
              Cancell
            </Button>
            <Button
              disabled={selectedStudio === null}
              onClick={handleSubmit}
              variant="contained"
            >
              Sell
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default SellMovieModal;
