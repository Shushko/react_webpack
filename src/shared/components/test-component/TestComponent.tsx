import React from 'react';
import * as Styled from './styles';
import PNG from 'assets/images/react-logo.png';

const TestComponent: React.FC = (): React.ReactElement => {
  return (
    <div>
      <Styled.PlainText>App File TEST</Styled.PlainText>
      <img className='test' src={PNG} alt='Test Image' />
    </div>
  );
};

export default TestComponent;
