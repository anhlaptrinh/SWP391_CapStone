import { ReactNode } from 'react';
import { RouteObject } from 'react-router-dom';

export interface RouteMeta {
    key: string;
    label: string;
    icon?: ReactNode;
    suffix?: ReactNode;
    hideMenu?: boolean;
    hideTab?: boolean;
    disabled?: boolean;
    outlet?: any;
    timeStamp?: string;
    frameSrc?: string;
}
export type AppRouteObject = {
    order?: number;
    meta?: RouteMeta;
    children?: AppRouteObject[];
} & Omit<RouteObject, 'children'>;