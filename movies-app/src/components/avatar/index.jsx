import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_AVATAR } from 'utils/constants';
import StyledAvatar from 'components/styled/avatar';
import ErrorImg from 'components/styled/error-img';

const Avatar = ({
  name, img, isDrawer, isLogo,
}) => (
  <StyledAvatar
    $isDrawer={isDrawer}
    alt={name}
    src={img}
    imgProps={{
      loading: 'lazy',
      referrerPolicy: 'no-referrer',
    }}
    variant="circular"
    $isLogo={isLogo}
  >
    <ErrorImg
      alt={name}
      src={DEFAULT_AVATAR}
    />
  </StyledAvatar>
);

Avatar.propTypes = {
  name: PropTypes.string,
  img: PropTypes.string,
  isDrawer: PropTypes.bool,
  isLogo: PropTypes.bool,
};

export default Avatar;
