import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const SellModal = (props) => {
  const { open, closeModal, confirm, movie, studios } = props;
  const [selectedStudio, setSelectedStudio] = useState(null);
  const availableStudios = studios.filter(
    (studio) => studio.id !== movie.studioId
  );
  console.log(availableStudios);

  const handleSelect = (value) => {
    console.log('value', value);
    setSelectedStudio(value);
  }

  const handleSell = () => {
    confirm(selectedStudio);
    setSelectedStudio(null);
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-title" variant="h6" component="h2"></Typography> */}
          <FormControl>
            <FormLabel id="studios">
              Select the Studio to which this movie will be sold
            </FormLabel>
            <RadioGroup
              aria-labelledby="studios-radio-buttons-group"
              name="studios-radio-buttons-group"
              value={selectedStudio}
              // onChange={(e) => handleSelect(e.target.value)}
            >
              {availableStudios.map((studio) => (
                <FormControlLabel
                  value={studio.id}
                  control={<Radio />}
                  label={studio.name}
                  onClick={() => handleSelect(studio.id)}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <Button
            size="small"
            color="primary"
            disabled={!selectedStudio}
            onClick={handleSell}
            variant="contained"
          >
            Confirm
          </Button>
          <Button size="small" color="primary" onClick={closeModal}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
