import React from 'react';
import * as Styled from './styles';
import Spinner from 'assets/images/spinner.svg';

const FullScreenLoader = (): React.ReactElement => {
  return (
    <Styled.FullScreenContainer>
      <img src={Spinner} alt='Loading' />
    </Styled.FullScreenContainer>
  );
};

export default FullScreenLoader;
