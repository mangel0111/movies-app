import config from '../constants/config'
import RESOURCES from '../constants/resources'

/**
 *
 * @param {keyof RESOURCES} resource
 * @returns {Promise<any>}
 */
async function fetcher(resource) {
  try {
    if (!RESOURCES[resource]) throw new Error('NO VALID RESOURCE')
    const rawData = await fetch(`${config.DOMAIN}/${RESOURCES[resource]}`)
    const data = await rawData.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export default fetcher
