import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

import './styles.scss';

import Play from '../../../../assets/images/play.svg';

export interface PlayHandlerType
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    controlsVisible: boolean,
    videoHandler: (state: string) => void
}

const PlayHandler: React.FC<PlayHandlerType> = ({
    controlsVisible,
    videoHandler,
}) => {
    return controlsVisible ? (
        <div className="controlsContainer">
            <div className="controls">
                <img
                    onClick={() => videoHandler("play")}
                    className="playControlsIcon"
                    alt=""
                    src={Play}
                />
            </div>
        </div>
    ) : <></>
};

export default PlayHandler;