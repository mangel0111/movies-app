import React from 'react'
import { Typography, styled } from '@material-ui/core'
const NameLabel = styled(Typography)({
    display: 'inline-block'
})

const MoviePosition = styled(Typography)({
    fontWeight: 'bold',
    display: 'inline-block'
})

const DefaultImage = ({ movie }) => {
    return (
        <div>
            <NameLabel>
                {movie.name + ' '}
                <MoviePosition>
                    {movie.position}
                </MoviePosition>
            </NameLabel>
        </div>
    )
}

export default DefaultImage