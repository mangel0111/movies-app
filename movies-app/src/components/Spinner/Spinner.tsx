import tw, { css, styled } from 'twin.macro';

const DivSpinner = styled.div(() => [
  tw`relative inline-block w-16 h-16`,
  css`
    div:nth-of-type(1) {
      animation-delay: -0.45s;
    }
  `,
  css`
    div:nth-of-type(2) {
      animation-delay: -0.3s;
    }
  `,
  css`
    div:nth-of-type(3) {
      animation-delay: -0.15s;
    }
  `,
]);

const DivLine = tw.div`block absolute w-12 h-12 m-1.5 border-[6px]
  rounded-full border-transparent border-t-$violet animate-loader`;

const Spinner = () => (
  <DivSpinner data-testid="spinner">
    <DivLine />
    <DivLine />
    <DivLine />
    <DivLine />
  </DivSpinner>
);

export default Spinner;
