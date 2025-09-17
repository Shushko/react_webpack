import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { ROUTES } from './routes';
import { ERouteType, RouteItem } from 'shared/types';
import { HomePage, NotFoundPage } from 'pages';
import { RootState, useAppDispatch, useAppSelector } from 'services/store';
import { toggleLoader } from 'services/store/reducers';
import { FullScreenLoader } from 'shared/components';

const getRoute = (route: RouteItem): React.ReactElement => {
  switch (route.type) {
    case ERouteType.GUARDED:
      return <Route path={route.path} element={route.component} key={route.path} />;
    case ERouteType.NOT_GUARDED:
      return <Route path={route.path} element={route.component} key={route.path} />;
    default:
      return <Route path={route.path} element={route.component} key={route.path} />;
  }
};

const MainRoutes: React.FC = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((store): RootState => store);

  const { isLoaderActive } = store.loader;

  const switchLoaderVisibility = (isActive: boolean): void => {
    dispatch(toggleLoader(isActive));
  };

  useEffect((): void => {
    setTimeout((): void => {
      switchLoaderVisibility(false);
    }, 2000);
  }, []);

  return (
    <>
      {isLoaderActive && <FullScreenLoader />}
      <Routes>
        <Route index element={<HomePage />} />
        {ROUTES.map((route): React.ReactElement => getRoute(route))}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default MainRoutes;
