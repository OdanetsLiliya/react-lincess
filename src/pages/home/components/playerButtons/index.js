import React from 'react';
import screenfull from 'screenfull';

import './styles.scss';

import BackWard from '../../../../assets/images/backward-5.svg';
import ForWard from '../../../../assets/images/forward-5.svg';
import Pause from '../../../../assets/images/pause.svg';
import Play from '../../../../assets/images/play.svg';
import Enlarge from '../../../../assets/images/enlarge.svg';
import Shrink from '../../../../assets/images/shrink.svg';
import Prev from '../../../../assets/images/prev.svg';
import Next from '../../../../assets/images/next.svg';
import PlayerMenu from '../../../../assets/images/player-menu.svg';

import TimeControls from '../timeControls';
import VolumeControls from '../volumeControls';
import PlayerEpisodeMenu from '../playerEpisodeMenu';

const PlayerButtons = ({
    videoHandler, revert, fastForward, playing, toogleFullScreen,
    exitFullScreen, videoVolumeUpdate,  videoTime,
    currentTime, currentEpisode, setCurrentEpisode, currentSeason, setCurrentSeason,
    isEpisodeMenuOpen, setIsEpisodeMenuOpen
}) => {
    return (
        <div className="playControlsContainer">
            <div className="leftControlsContainer">
            {playing ? (
                <img
                    onClick={() => videoHandler("pause")}
                    className="controlsIcon"
                    alt=""
                    src={Pause}
                />
            ) : (
                <img
                    onClick={() => videoHandler("play")}
                    className="controlsIcon"
                    alt=""
                    src={Play}
                />
            )}
            <div className="leftButtonsControl">
            <img
                className="controlsIcon"
                onClick={fastForward}
                alt=""
                src={Prev}
            />
            <img
                className="controlsIcon"
                onClick={fastForward}
                alt=""
                src={Next}
            />
            </div>
           
            <div className="leftButtonsControl">
            <img
                onClick={revert}
                className="controlsIcon"
                alt=""
                src={BackWard}
            />
            <img
                className="controlsIcon"
                onClick={fastForward}
                alt=""
                src={ForWard}
            />
            </div>
            <VolumeControls
                updateVolume={videoVolumeUpdate}
            />
            <TimeControls
                videoTime={videoTime}
                currentTime={currentTime}
            />
            </div>
    
            <div className="rightControlsContainer">

            <PlayerEpisodeMenu
               currentEpisode={currentEpisode}
               setCurrentEpisode={setCurrentEpisode}
               currentSeason={currentSeason}
               setCurrentSeason={setCurrentSeason}
               isOpen={isEpisodeMenuOpen}
               setIsOpen={setIsEpisodeMenuOpen}
            />
            {!screenfull.isFullscreen ? <img
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
                />}
            </div>
           
        </div>
    );
};

export default PlayerButtons;