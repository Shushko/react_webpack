import styled from 'styled-components';

export const FullScreenContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  
  img {
    width: 70px;
    height: 70px;
  }
`;
