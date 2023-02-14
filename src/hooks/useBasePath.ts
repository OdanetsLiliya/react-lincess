import { matchPath } from 'react-router'
import { useLocation } from 'react-router-dom';

import { breadCrumbsRoutes } from '../assets/constants/routingConstants';

export const useBreadCrumbsRoutes = () => {
    const location = useLocation();
    const match = Object.keys(breadCrumbsRoutes).find(key => matchPath(key, location.pathname));          
    return match || false;
};