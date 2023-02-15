import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

import Spinner from '../../../../assets/images/spinner.svg';

import './styles.scss';

export interface PlayerLoaderPropsType
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    loading: boolean,
}

const PlayerLoader: React.FC<PlayerLoaderPropsType> = ({
    loading
}) => {
    return loading ? (
        <div className="videoLoaderContainer">
            <img alt="" src={Spinner} className="spinnerContainer" />
        </div>) : <></>
};

export default PlayerLoader;