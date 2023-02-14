import React, { useState, useEffect, HTMLAttributes, DetailedHTMLProps } from 'react';

import './styles.scss';

import PipOn from '../../../../../../assets/images/pipOn.svg';
import PipOff from '../../../../../../assets/images/pipOff.svg';

import usePip from '../../../../../../hooks/usePip';

export interface PipControlsPropsType
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    videoRef: any,
}

const PipControls: React.FC<PipControlsPropsType> = ({
    videoRef
}) => {
    const [isPipOn, setIsPipOn] = useState(false);
    const { togglePIP } = usePip(videoRef);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const onEnterPIP = () => setIsPipOn(true);
        const onLeavePIP = () => setIsPipOn(false);

        video.addEventListener("enterpictureinpicture", onEnterPIP);
        video.addEventListener("leavepictureinpicture", onLeavePIP);
        return () => {
            video.removeEventListener("enterpictureinpicture", onEnterPIP);
            video.removeEventListener("leavepictureinpicture", onLeavePIP);
        };
    }, [videoRef]);

    return !isPipOn ? <img
        className="pipControlsIcon"
        onClick={togglePIP}
        alt=""
        src={PipOff}
    /> :
        <img
            className="pipControlsIcon iconPipOff"
            onClick={togglePIP}
            alt=""
            src={PipOn}
        />

};

export default PipControls;