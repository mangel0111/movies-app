import { sony, warner, disney } from '../../constants/studio_constants.mjs'

export function getStudios(req, res) {
    let disneyTemp = {...disney};
    delete disneyTemp.movies;
    let warnerTemp = {...warner};
    delete warnerTemp.movies;
    let sonyTemp = {...sony};
    delete sonyTemp.movies;
    res.json([
        disneyTemp,
        warnerTemp,
        sonyTemp
    ]);
}