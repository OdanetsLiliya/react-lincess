import React, { useState, HTMLAttributes, DetailedHTMLProps } from 'react';
import screenfull from 'screenfull';

import './styles.scss';

import Enlarge from '../../../../../../assets/images/enlarge.svg';
import Shrink from '../../../../../../assets/images/shrink.svg';

export interface FullScreenControlsPropsType
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    playerRef: any,
}

const FullScreenControls: React.FC<FullScreenControlsPropsType> = ({
    playerRef,
}) => {

    const [isFullScreen, setIsFullScreen] = useState(false);

    const toogleFullScreen = () => {
        if (screenfull.isEnabled) {
            screenfull.request(playerRef.current);
            setIsFullScreen(true);
        }
    }

    const exitFullScreen = () => {
        if (screenfull.isEnabled) {
            screenfull.exit();
            setIsFullScreen(false);
        }
    }

    return (!isFullScreen ? <img
        className="fullScreenControlsIcon"
        onClick={toogleFullScreen}
        alt=""
        src={Enlarge}
    /> :
        <img
            className="fullScreenControlsIcon"
            onClick={exitFullScreen}
            alt=""
            src={Shrink}
        />
    );
};

export default FullScreenControls;