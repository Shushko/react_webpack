import { ERouteType, RouteItem } from 'shared/types';
import { AboutUsPage, HomePage } from 'pages';

export const ROUTES: RouteItem[] = [
  {
    type: ERouteType.NOT_GUARDED,
    path: 'home',
    component: <HomePage />
  },
  {
    type: ERouteType.NOT_GUARDED,
    path: 'about-us',
    component: <AboutUsPage />
  }
];
