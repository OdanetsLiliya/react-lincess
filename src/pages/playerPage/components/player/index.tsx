import React, { useRef, useState, useEffect } from 'react';

import './styles.scss';

import PlayHandler from '../playHandler';
import PlayerMenu from '../playerMenu';
import TopPlayerMenu from '../topPlayerMenu';
import ReactHlsPlayer from '../reactHlsPlayer';
import PlayerLoader from '../playerLoader';
import { Workout } from '../../../../types/workoutTypes';

const Player = ({ detailedWorkout, isSmall = false }: { detailedWorkout: Workout, isSmall?: boolean }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<HTMLDivElement>(null);

    const [playing, setPlaying] = useState(false);
    const [controlsVisible, setControlsVisible] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [videoTime, setVideoTime] = useState(0);
    const [timeControlsEnabled, setTimeControlsEnabled] = useState(false);
    const [isEpisodeMenuOpen, setIsEpisodeMenuOpen] = useState(false);
    const [isLoadedMetadata, setIsLoadedMetadata] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const videoHandler = (control: string) => {
        if (videoRef.current) {
            if (control === "play") {
                videoRef.current.play();
                setPlaying(true);
                setControlsVisible(false);
                const vid = document.getElementById("video1") as HTMLVideoElement | null;
                if (vid?.duration) {
                    setVideoTime(vid.duration);
                }
            } else if (control === "pause") {
                videoRef.current.pause();
                setPlaying(false);
                setControlsVisible(true);
            }
            setTimeControlsEnabled(true);
        }
    };

    const handleLoadedMetadata = () => {
        const videoRefCur = videoRef.current;
        if (!videoRefCur) return;
        console.log(`The video is ${videoRefCur.duration} seconds long.`);
        setVideoTime(videoRefCur.duration)
        setIsLoadedMetadata(true)
    }

    const onTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current?.currentTime);
        }
    }

    const onLoadStart = () => {
        console.log('onLoadStart')
    }

    const onVideoClick = () => {
        if (isLoadedMetadata) {
            videoHandler(playing ? "pause" : "play")
        }
    }

    // Commented to fix blob error
    // https://github.com/videojs/video.js/issues/7005
    /* useEffect(()=> {
       videoRef.current.load()
    }, [detailedWorkout]) */

    useEffect(() => {
        const keyBoardListenerFunc = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                videoHandler(playing ? "pause" : "play")
            }
        }
        document.addEventListener('keydown', keyBoardListenerFunc);
        return () => {
            document.removeEventListener("keydown", keyBoardListenerFunc)
        }
    }, [playing])

    return (
        <div className={`customPlayer unselectableItems`}>
            <div className={`playerContainer ${isSmall ? 'smallPlayer' : ''} `} ref={playerRef}>
                <ReactHlsPlayer
                    playerRef={videoRef}
                    src={detailedWorkout.video_url}
                    preload="metadata"
                    onClick={onVideoClick}
                    onLoadedMetadata={handleLoadedMetadata}
                    onTimeUpdate={onTimeUpdate}
                    onLoadStart={onLoadStart}
                    onWaiting={() => setIsLoading(true)}
                    onPlaying={() => setIsLoading(false)}
                // poster={detailedWorkout.image_preview_url}
                />

                <PlayHandler
                    controlsVisible={controlsVisible && isLoadedMetadata}
                    videoHandler={videoHandler}
                />

                {!isSmall ? <TopPlayerMenu
                    title={detailedWorkout.title}
                    isEpisodeMenuOpen={isEpisodeMenuOpen}
                    onClick={onVideoClick}
                    playing={playing}
                    description={detailedWorkout.description}
                /> : <></>}

                <PlayerMenu
                    videoHandler={videoHandler}
                    videoRef={videoRef}
                    playerRef={playerRef}
                    videoTime={videoTime}
                    currentTime={currentTime}
                    setCurrentTime={setCurrentTime}
                    timeControlsEnabled={timeControlsEnabled}
                    playing={playing}
                    currentWorkout={detailedWorkout}
                    setCurrentWorkout={() => { }}
                    currentWorkoutType={detailedWorkout.workout_type || {}}
                    setCurrentWorkoutType={() => { }}
                    isEpisodeMenuOpen={isEpisodeMenuOpen}
                    setIsEpisodeMenuOpen={setIsEpisodeMenuOpen}
                />

                <PlayerLoader
                    loading={isLoading}
                />

            </div>
        </div>
    );
};

export default Player;