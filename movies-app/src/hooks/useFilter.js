import { useEffect, useState } from 'react'

/**
 *
 * @param {{ data: any, fields: { [type]: string } }} param0
 */
const useFilter = ({ data: rawData, fields }) => {
  const [data, setData] = useState(rawData)
  const [input, setInput] = useState('')

  useEffect(() => {
    if (!rawData) return
    if (!input) return setData(rawData)
    const newData = rawData.filter((rData) => {
      for (const key in fields) {
        if (!rData[key]) continue

        const current = rData[key].toString().toLowerCase().trim()
        const _input = input.toLowerCase().trim()
        if (current.includes(_input)) return true
      }
      return false
    })
    setData(newData)
  }, [input, rawData, fields])

  /**
   *
   * @param {string} str
   */
  const handleChange = (str) => {
    setInput(str)
  }

  return { data, value: input, handleChange }
}

export default useFilter
