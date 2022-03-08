import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Grid, Card, Typography, Button } from '@material-ui/core'
import { styled } from '@material-ui/core'
import {updateMovies, updateStudios} from "actions"
import * as Api from 'api'
import DefaultImage from 'components/atoms/DefaultImage/DefaultImage'
import Avatar from 'components/atoms/Avatar/Avatar'

const defaultAvatar = 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg'

const StyledCard = styled(Card)(({ theme, isSmallCard }) => ({
    height: `calc(100% - ${theme.spacing(4)}px)`,
    rowGap: theme.spacing(1),
    border: "1px solid gray",
    borderRadius: 4,
    margin: 2,
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: isSmallCard ? "row" : "column",
    alignItems: "center",
    justifyContent: isSmallCard ? "left" : "center"
}))

const PossibleBuyersContainer = styled(Grid)({
    columnGap: 8, 
    rowGap: 8, 
    justifyContent: "center"
})

const MyCard = ({ isSmallCard, movie }) => {
    const dispatch = useDispatch();
    const { studios } = useSelector((state) => state);
    const movieStudio = studios.filter(studio => studio.id === movie.studioId)[0]
    const possibleBuyers = studios.filter(studio => studio.id !== movieStudio.id && movie.price < studio.money)

    const onSellMovie = async (movieId, movieStudioId, nextStudioId) => {
        await Api.transferMovie({ movieId, movieStudioId, nextStudioId })
            .then(({ movies, studios }) => {
                dispatch(updateMovies(movies))
                dispatch(updateStudios(studios))
            })
    }
    return (
        <StyledCard id={`${movie.name}-card`} isSmallCard={isSmallCard} raised>
            <Grid container>
                <Grid item xs={4} sm={12} style={{justifyContent:"center",display:"flex"}}>
                    <Avatar
                        id={`${movie.name}-avatar`}
                        width={isSmallCard ? 60 : 280}
                        height={isSmallCard ? 60 : 280}
                        alt={movie.name}
                        imgProps={{
                            referrerPolicy: "no-referrer"
                        }}
                        src={movie.img || defaultAvatar}
                    />
                </Grid>
                <Grid item xs={8} sm={12}>
                    <DefaultImage movie={movie} />
                    <Typography variant="body2">{movieStudio.name}</Typography>
                </Grid>
                {
                    Boolean(possibleBuyers.length) && (
                        <>
                            <Grid item xs={12}>
                                <Typography variant="body2">
                                    Sell to:
                                </Typography>
                            </Grid>
                            <PossibleBuyersContainer item xs={12} container>
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
                            </PossibleBuyersContainer>
                        </>
                    )
                }
            </Grid>
        </StyledCard>
    )
}

export default MyCard