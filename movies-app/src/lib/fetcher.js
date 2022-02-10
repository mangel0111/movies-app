import config from '../constants/config'
import RESOURCES from '../constants/resources'

/**
 *
 * @param {keyof RESOURCES["GET"]} resource
 * @returns {Promise<any>}
 */
export async function fetcher(resource) {
  try {
    if (!RESOURCES.GET[resource]) throw new Error('NO VALID RESOURCE')
    const rawData = await fetch(
      `${config.DOMAIN}/${RESOURCES['GET'][resource]}`
    )
    const data = await rawData.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}

/**
 *
 * @param {Exclude<keyof RESOURCES, "GET">} method
 * @param {string} resource from resource.[method]
 * @param {any} data
 * @returns {Promise<any>}
 */
export async function mutator(method, resource, data) {
  try {
    if (!RESOURCES[method][resource]) throw new Error('NO VALID RESOURCE')
    const res = await fetch(`${config.DOMAIN}/${RESOURCES[method][resource]}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const json = await res.json()
    return json
  } catch (error) {
    throw new Error(error)
  }
}
