import React from 'react'
import { Grid, Card, Typography, Button } from '@material-ui/core'
import { styled } from '@material-ui/core'
import DefaultImage from '../DefaultImage/DefaultImage'
import Avatar from '../Avatar/Avatar'
import * as Api from '../../api'
import { useDispatch, useSelector } from "react-redux";
// TODO: Review image loading from wikia.com
const defaultAvatar = 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg'

const StyledCard = styled(Card)(({ theme }) => ({
    height: `calc(100% - ${theme.spacing(4)}px)`,
    padding: theme.spacing(2),
    rowGap: theme.spacing(1),
    border: "none",
    borderRadius: 10
}))


const MyCard = ({ isSmallCard, movie }) => {
    const dispatch = useDispatch();
    const { studios } = useSelector((state) => state);
    const movieStudio = studios.filter(studio => studio.id === movie.studioId)[0]
    const possibleBuyers = studios.filter(studio => studio.id !== movieStudio.id && movie.price < studio.money)
    const onSellMovie = async (movieId, movieStudioId, nextStudioId) => {
        await Api.transferMovie({ movieId, movieStudioId, nextStudioId })
            .then(({ movies, studios }) => {
                dispatch({ type: "UPDATE_MOVIES", payload: movies })
                dispatch({ type: "UPDATE_STUDIOS", payload: studios })
            })
    }
    return (
        <StyledCard id={`${movie.name}-card`} raised className={isSmallCard ? "smallCard" : "regularCard"}>
            <Avatar
                id={`${movie.name}-avatar`}
                width={isSmallCard ? 60 : 280}
                height={isSmallCard ? 60 : 280}
                alt={movie.name}
                src={movie.img || defaultAvatar}
            />
            <DefaultImage movie={movie} />
            <Typography variant="body2">{movieStudio.name}</Typography>
            {
                Boolean(possibleBuyers.length) && (
                    <>
                        <Typography variant="body2">
                            Sell to:
                        </Typography>
                        <Grid container style={{ columnGap: 8, justifyContent: "center" }}>
                            {
                                possibleBuyers.map(studio => (
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => onSellMovie(movie.id, movie.studioId, studio.id)}>
                                            {studio.name}
                                        </Button>
                                    </Grid>
                                ))}
                        </Grid>
                    </>
                )
            }

        </StyledCard>
    )
}

export default MyCard