import React from 'react'
import { Card, Typography } from '@material-ui/core'
import DefaultImage from '../DefaultImage/DefaultImage'
import Avatar from '../Avatar/Avatar'
import * as Api from '../../api'
// TODO: Review image loading from wikia.com
const defaultAvatar = 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg'

const MyCard = ({ isSmallCard, movie, studios, onSellMovie }) => {
    const movieStudio = studios.filter(studio => studio.id === movie.studioId)[0]
    const possibleBuyers = studios.filter(studio => studio.id !== movieStudio.id && movie.price < studio.money)

    return (
        <Card id={`${movie.name}-card`} className={isSmallCard ? "smallCard" : "regularCard"}>
            <Avatar id={`${movie.name}-avatar`} width={isSmallCard ? 60 : 280} height={isSmallCard ? 60 : 280} alt={movie.name} src={movie.img || defaultAvatar} />
            <DefaultImage movie={movie} />
            <Typography>{movieStudio.name}</Typography>
            <Typography>
                Sell to:
                {
                    possibleBuyers.map(studio => (
                        <button onClick={() => onSellMovie(movie.id, movie.studioId, studio.id)}>{studio.name}</button>
                    ))}</Typography>
        </Card>
    )
}

export default MyCard