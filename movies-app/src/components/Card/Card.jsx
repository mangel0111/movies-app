import React from 'react'
import { Card, Typography } from '@material-ui/core'
import DefaultImage from '../DefaultImage/DefaultImage'
import Avatar from '../Avatar/Avatar'
// TODO: Review image loading from wikia.com
const defaultAvatar = 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg'

const MyCard = ({ isSmallCard, movie, studios }) => {
    return (
        <Card id={`${movie.name}-card`} className={isSmallCard ? "smallCard" : "regularCard"}>
            <Avatar id={`${movie.name}-avatar`} width={isSmallCard ? 60 : 280} height={isSmallCard ? 60 : 280} alt={movie.name} src={movie.img || defaultAvatar} />
            <DefaultImage movie={movie} />
            <Typography>{
                // eslint-disable-next-line
                studios.map(studio => {
                    if (movie.studioId === studio.id) {
                        return studio.name
                    }
                })}</Typography>
        </Card>
    )
}

export default MyCard