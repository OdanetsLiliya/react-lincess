import React from 'react';
import { useSelector } from 'react-redux';

import Spinner from '../../assets/images/spinner.svg';

import './styles.scss';

const Loader = () => {
    const loading = useSelector((state) => state.app.loading);
    return loading && (
        <div className="loaderContainer">
            <img alt="" src={Spinner} />
        </div>
    )
};

export default Loader;