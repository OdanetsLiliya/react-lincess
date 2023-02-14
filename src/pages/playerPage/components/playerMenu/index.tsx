import React, { useRef, HTMLAttributes, DetailedHTMLProps, useEffect } from 'react';
import screenfull from 'screenfull';

import './styles.scss';

import PlayerButtons from './components/playerButtons';
import TimeProgressBar from './components/timeProgressBar';

import { Workout } from '../../../../types/workoutTypes';
import { WorkoutType } from '../../../../types/workoutTypeTypes';

export interface PlayerMenuPropsType
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    videoHandler: (control: string) => void,
    videoRef: any,
    playerRef: any,
    videoTime: number,
    currentTime: number,
    setCurrentTime: (time: number) => void,
    timeControlsEnabled: boolean,
    playing: boolean;
    currentWorkout: Workout;
    setCurrentWorkout: (workout: Workout) => void,
    currentWorkoutType: WorkoutType;
    setCurrentWorkoutType: (workoutType: WorkoutType) => void,
    isEpisodeMenuOpen: boolean,
    setIsEpisodeMenuOpen: (status: boolean) => void
}

const PlayerMenu: React.FC<PlayerMenuPropsType> =  ({
    videoHandler, videoRef, playerRef, videoTime,
    currentTime, setCurrentTime, timeControlsEnabled, playing,
    currentWorkout, setCurrentWorkout, currentWorkoutType, setCurrentWorkoutType,
    isEpisodeMenuOpen, setIsEpisodeMenuOpen
}) => {
    const timeProgressBarRef: any = useRef();

    const fastForward = () => {
        videoRef.current.currentTime += 5;
    };

    const revert = () => {
        videoRef.current.currentTime -= 5;
    };

    const revertWithPanel = () => {
        revert();
        timeProgressBarRef.current.inputRangeChange(-5);
    }

    const forwardWithPanel = () => {
        fastForward();
        timeProgressBarRef.current.inputRangeChange(5);
    }

    const refreshTimeProgressBar = () => {
        timeProgressBarRef.current.inputRangeRefresh();
    }

    useEffect(() => {
        timeProgressBarRef.current.inputRangeUpdate();
    }, [currentTime])


    return (
        <div
            className={`playerMenu ${playing && !isEpisodeMenuOpen ? 'animate' : ''}`}
            style={{ opacity: !timeControlsEnabled ? 0 : 1 }}
        >
            <div className={`topMenuGradient ${screenfull.isFullscreen ? '' : 'menuBlur'}`}>
                <TimeProgressBar
                    videoRef={videoRef}
                    videoTime={videoTime}
                    setCurrentTime={setCurrentTime}
                    ref={timeProgressBarRef}
                    currentTime={currentTime}
                    currentWorkout={currentWorkout}
                />

                <PlayerButtons
                    videoRef={videoRef}
                    playerRef={playerRef}
                    revert={revertWithPanel}
                    videoHandler={videoHandler}
                    fastForward={forwardWithPanel}
                    playing={playing}
                    videoTime={videoTime}
                    currentTime={currentTime}
                    currentWorkout={currentWorkout}
                    setCurrentWorkout={setCurrentWorkout}
                    currentWorkoutType={currentWorkoutType}
                    setCurrentWorkoutType={setCurrentWorkoutType}
                    isEpisodeMenuOpen={isEpisodeMenuOpen}
                    setIsEpisodeMenuOpen={setIsEpisodeMenuOpen}
                    refreshTimeProgressBar={refreshTimeProgressBar}
                />
            </div>
        </div>
    );
};

export default PlayerMenu;