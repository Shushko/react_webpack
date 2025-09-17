import React from 'react';
import { TestComponent } from 'shared/components';

const HomePage: React.FC = (): React.ReactElement => {
  return (
    <>
      <h1>Home Page</h1>
      <TestComponent />
    </>
  );
};

export default HomePage;
