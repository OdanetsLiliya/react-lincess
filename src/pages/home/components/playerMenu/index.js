import React, { useRef, useState } from 'react';

import './styles.scss';

import PlayerButtons from '../playerButtons';
import TimeProgressBar from '../timeProgressBar';

const PlayerMenu = ({
    revert, videoHandler, fastForward, videoRef,
    toogleFullScreen, exitFullScreen, setVideoTime, videoTime,
    currentTime, setCurrentTime, timeControlsEnabled, playing,
    videoVolumeUpdate, currentEpisode, setCurrentEpisode, currentSeason, setCurrentSeason
}) => {
    let interval;
    const timeProgressBarRef = useRef();
    const [hoveredState, setHoveredState] = useState(false);
    const [isEpisodeMenuOpen, setIsEpisodeMenuOpen] = useState(false);

    const onMouseMoveFullPanel = () => {
        setHoveredState(true);
        clearInterval(interval);
        interval = setInterval(() => setHoveredState(false), 3000);
    }

    const revertWithPanel = () => {
        revert();
        timeProgressBarRef.current.inputRangeChange(-5);
    }

    const forwardWithPanel = () => {
        fastForward();
        timeProgressBarRef.current.inputRangeChange(5);
    }
 
    return (
        <div
        className={`playerMenu ${playing && !hoveredState && !isEpisodeMenuOpen ? 'animate' : ''}`}
        style={{ opacity: !timeControlsEnabled ? 0 : 1}}
        onMouseMove={onMouseMoveFullPanel}
        >
            <TimeProgressBar
               videoRef={videoRef}
               setVideoTime={setVideoTime}
               videoTime={videoTime}
               setCurrentTime={setCurrentTime}
               setHoveredState={setHoveredState}
               ref={timeProgressBarRef}
               currentTime={currentTime}
            />
        
            <PlayerButtons
                revert={revertWithPanel}
                videoHandler={videoHandler}
                fastForward={forwardWithPanel}
                playing={playing}
                toogleFullScreen={toogleFullScreen}
                exitFullScreen={exitFullScreen}
                videoVolumeUpdate={videoVolumeUpdate}
                videoTime={videoTime}
                currentTime={currentTime}
                currentEpisode={currentEpisode}
                setCurrentEpisode={setCurrentEpisode}
                currentSeason={currentSeason}
                setCurrentSeason={setCurrentSeason}
                isEpisodeMenuOpen={isEpisodeMenuOpen}
                setIsEpisodeMenuOpen={setIsEpisodeMenuOpen}
            />
        </div>
    );
};

export default PlayerMenu;