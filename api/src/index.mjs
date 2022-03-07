import server from './server.mjs'
import * as constants from '../constants/studio_constants.mjs'
const port = process.env.PORT || 3000

server(constants).listen(port)
