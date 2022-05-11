import styled from 'styled-components';

export const ModalContainer = styled.div`
  animation-duration: 0.5s;
  animation-name: showModal;
  background-color: #ececec;;
  border: none;
  height: 100%;
  position: absolute;
  right: 0;
  width: 100%;

  @keyframes showModal {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  @media (min-width: 601px) and (max-width: 1080px) {
    padding: 32px;
    border-radius: 25px 0 0 25px;
    width: 55%;
    @keyframes showModal {
      from {
        width: 0;
      }
      to {
        width: 55%;
      }
    }
  }

  @media (min-width: 1081px) {
    padding: 32px;
    border-radius: 25px 0 0 25px;
    width: 40%;
    @keyframes showModal {
      from {
        width: 0;
      }
      to {
        width: 40%;
      }
    }
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 320px;
  padding: 32px;
`;
