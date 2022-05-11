import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {StyledAvatar} from './style';

const defaultAvatar =
  'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg';

const Avatar = ({name, src, ...other}) => {
  const [source, setSource] = useState(src);
  return (
    <StyledAvatar
      alt={name}
      imgProps={{
        loading: 'lazy',
        onError: () => setSource(defaultAvatar),
        referrerPolicy: 'no-referrer'
      }}
      src={source}
      variant="rounded"
      {...other}
    />
  );
};

Avatar.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string
};
export default Avatar;
