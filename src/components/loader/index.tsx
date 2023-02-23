import React from 'react';
import { useSelector } from 'react-redux';

import Spinner from '../../assets/images/spinner.svg';

import { RootStateType } from '../../stores';

import './styles.scss';

const Loader: React.FC = () => {
    const loading = useSelector((state: RootStateType) => state.app.loading);
    return loading ? (
        <div className="loaderContainer">
            <img alt="" src={Spinner} />
        </div>) : <></>
};

export default Loader;