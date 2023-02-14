import React from 'react';

import './styles.scss';

import Play from '../../../../assets/images/play.svg';

const PlayHandler = ({ controlsVisible, videoHandler }) => {
    return (
        controlsVisible && (
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
        ))
};

export default PlayHandler;