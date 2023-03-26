import { factory, primaryKey } from "@mswjs/data"

export const db = factory({
    movies: {
        id: primaryKey(Number),
        name: String,
        genre: Number,
        imgUrl: String,
        studioId: String,
        price: Number
    },
    studios: {
        id: primaryKey(String),
        name: String,
        shortName: String,
        logo: String,
        money: Number
    },
    genres: {
        key: primaryKey(Number),
        text: String
    },
});