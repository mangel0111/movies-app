import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useStyles } from './MovieListSection.styles.js'
import TransferModal from '../TransferModal';

const defaultAvatar = 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg'

const MovieListSection = ({
    movies,
    studios,
    confirm,
    showNoResults
}) => {
    const styles = useStyles();

    const [showModal, setShowModal] = useState(false);
    const [modalProps, setModalProps] = useState({studios:[]});

    const openModal = (studioId, movieId) => {
        setModalProps({studios: studios.filter(studio => studio.id !== studioId), movieId})
        setShowModal(true);
    };

    return (
        <>
            <TransferModal open={showModal} confirmTransfer={confirm} onClose={() => setShowModal(false)} {...modalProps}/>
            <h3>Images:</h3>
            <Grid container justify="center" alignItems="center">
            {movies?.length ? movies.map(movie => {
                const studio = studios.find(studio => (
                movie.studioId === studio.id
                ))
                return (
                <Grid item xs={12} sm={6} lg={4} key={movie.name}>
                    <Card className={styles.card}>
                    <Avatar alt={movie.name} src={movie.imgUrl ?? defaultAvatar}
                            className={styles.avatar}
                            imgProps={{referrerPolicy:"no-referrer"}}/>
                    <div>
                        <Typography className={styles.movieName}>
                        {movie.name + ' '}
                        <span className={styles.moviePosition}>
                            {movie.position}
                        </span>
                        </Typography>
                    </div>
                    <Typography>{
                        studio?.name
                    }</Typography>
                    <Button onClick={() => openModal(studio.id, movie.id)}>Transfer</Button>
                    </Card>
                </Grid>
                )
            }) :
            showNoResults && <div>No results</div>}
            </Grid>
        </>
    );
};

export default MovieListSection;