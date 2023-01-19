import { Global } from '@emotion/react';
import React from 'react';
import tw, { css, GlobalStyles as BaseStyles, theme } from 'twin.macro';

const customStyles = css({
  body: {
    WebkitTapHighlightColor: theme`colors.purple.500`,
    ...tw`antialiased`,
  },
  h3: tw`m-3 text-xl font-bold`,
});

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);

export default GlobalStyles;
