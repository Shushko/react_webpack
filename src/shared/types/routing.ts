import { ERouteType } from './enums';
import React from 'react';

export type RouteItem = {
  type: ERouteType;
  path: string;
  component: React.ReactElement;
};
