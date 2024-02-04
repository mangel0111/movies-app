import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { useStyles } from './TransferModal.styles';

const TransferModal = ({open, onClose, studios, movieId, confirmTransfer}) => {

    const styles = useStyles();
    const [selectedStudio, setSelectedStudio] = useState('');

    const handleChange = (event) => {
        setSelectedStudio(event.target.value);
    };

    const handleClose = () => {
        setSelectedStudio('');
        onClose();
    }

    const handleTransfer = () => {
        confirmTransfer(selectedStudio, movieId);
        handleClose();
    }

    return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
    <Box className={styles.modalBox}>
        <h3>Transfer movie</h3>
        <TextField
            id="studio-select"
            name="studio-select"
            label="Studio"
            className={styles.modalItem}
            select
            variant="outlined"
            onChange={handleChange}
            value={selectedStudio}
        >
            {studios.map(studio => 
                <MenuItem key={studio.id} value={studio.id}>{studio.name}</MenuItem>
            )}
        </TextField>
        <Button 
            id="transferButton"
            variant="contained"
            className={styles.modalItem}
            onClick={handleTransfer}
            disabled={!selectedStudio}
        >
            Confirm Transfer
        </Button>
    </Box>
  </Modal>
    )
};

export default TransferModal;