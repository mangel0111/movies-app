import { useMediaQuery } from '@material-ui/core'
import { useEffect, useState } from 'react'

const useAvatarSize = () => {
  const [avatarSize, setAvatarSize] = useState(280)
  const [cardStyle, setCardStyle] = useState('regularCard')

  const asdf = useMediaQuery('(min-width:600px)')

  useEffect(() => {
    if (asdf) {
      setAvatarSize(60)
      setCardStyle('smallCard')
    } else {
      setAvatarSize(280)
      setCardStyle('regularCard')
    }
  }, [asdf])

  return { avatarSize, cardStyle }
}

export default useAvatarSize
