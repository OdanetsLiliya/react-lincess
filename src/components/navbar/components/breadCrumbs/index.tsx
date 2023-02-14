import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useBreadCrumbsRoutes } from '../../../../hooks/useBasePath';

import { breadCrumbsRoutes } from '../../../../assets/constants/routingConstants';

import './styles.scss';

const BreadCrumbs = () => {
    const matchedPath = useBreadCrumbsRoutes();
    const navigate = useNavigate();

    return matchedPath ? <div className="breadcrumbsContainer">
        {breadCrumbsRoutes[matchedPath].map((breadTitles: string, idx: number) => (
            idx !== breadCrumbsRoutes[matchedPath].length - 1 ?
            <>
                <div className='breadcrumbsText breadcrumbsTextClickable' onClick={() => navigate(-1)}>{breadTitles}</div>
                <div className='breadcrumbsText unselectableItems'>&nbsp;/</div>
            </>
            : <div className='breadcrumbsText unselectableItems' >&nbsp;{breadTitles}</div>
        ))}
    </div> : <></>
}

export default BreadCrumbs;