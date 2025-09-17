import './App.scss';
import React from 'react';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { MainRoutes } from 'routes';
import { store } from 'services/store';

const App: React.FC = (): React.ReactElement => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
