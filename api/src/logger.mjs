import bunyan from 'bunyan'
import bformat from 'bunyan-format'

const formatLogger = bformat({ outputMode: 'short' })

const logger = bunyan.createLogger({
  name: process.env.npm_package_name || 'studio-app',
  stream: formatLogger,
  level: 'debug',
})

export default logger
