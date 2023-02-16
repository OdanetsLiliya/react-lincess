import React, { HTMLAttributes, DetailedHTMLProps } from 'react';

import './styles.scss';

import BackWard from '../../../../../../assets/images/backward-5.svg';
import ForWard from '../../../../../../assets/images/forward-5.svg';
import Pause from '../../../../../../assets/images/pause.svg';
import Play from '../../../../../../assets/images/play.svg';
// import Prev from '../../../../../../assets/images/prev.svg';
// import Next from '../../../../../../assets/images/next.svg';

import TimeControls from '../timeControls';
import VolumeControls from '../volumeControls';
import FullScreenControls from '../fullScreenControls';
// import PlayerEpisodeMenu from '../../../playerWorkoutsMenu';
import PipControls from '../pipControls';


import { Workout } from '../../../../../../types/workoutTypes';
import { WorkoutType } from '../../../../../../types/workoutTypeTypes';

export interface PlayerMenuPropsType
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    videoHandler: (control: string) => void,
    videoRef: any,
    playerRef: any,
    videoTime: number,
    currentTime: number,
    playing: boolean;
    currentWorkout: Workout;
    setCurrentWorkout: (workout: Workout) => void,
    currentWorkoutType: WorkoutType;
    setCurrentWorkoutType: (workoutType: WorkoutType) => void,
    isEpisodeMenuOpen: boolean,
    setIsEpisodeMenuOpen: (status: boolean) => void,
    revert: () => void,
    fastForward: () => void,
    refreshTimeProgressBar: () => void,
}

// TO DO: think about other controls + menu
const PlayerButtons: React.FC<PlayerMenuPropsType> = ({
    videoHandler,
    playing,
    videoTime,
    currentTime,
    /* currentWorkout,
    setCurrentWorkout,
    currentWorkoutType,
    setCurrentWorkoutType,
    isEpisodeMenuOpen,
    setIsEpisodeMenuOpen,
    refreshTimeProgressBar,
    */
    videoRef,
    playerRef,
    revert,
    fastForward,
}) => {

    const videoVolumeUpdate = (volume) => {
        videoRef.current.volume = volume;
    }

    /* const refreshOrChageVideo = () => {
        refreshTimeProgressBar();
        videoHandler("pause");
    } */

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
                {/* <div className="leftButtonsControl">
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
                </div> */}

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
                {/* <PlayerEpisodeMenu
                    currentWorkout={currentWorkout}
                    setCurrentWorkout={setCurrentWorkout}
                    currentWorkoutType={currentWorkoutType}
                    setCurrentWorkoutType={setCurrentWorkoutType}
                    isOpen={isEpisodeMenuOpen}
                    setIsOpen={setIsEpisodeMenuOpen}
                    refreshOrChageVideo={refreshOrChageVideo}
                    fastForward={fastForward}
                 /> */}
                <PipControls
                    videoRef={videoRef}
                />
                <FullScreenControls
                    playerRef={playerRef}
                />
            </div>

        </div>
    );
};

export default PlayerButtons;