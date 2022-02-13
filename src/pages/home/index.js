import React, { useRef, useState } from 'react';
import screenfull from 'screenfull';

import './styles.scss';

import PlayHandler from './components/playHandler';
import PlayerMenu from './components/playerMenu';

const Home = () => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    
    const [playing, setPlaying] = useState(false);
    const [controlsVisible, setControlsVisible] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [videoTime, setVideoTime] = useState(0);
    const [progress, setProgress] = useState(0);
    const [currentEpisode, setCurrentEpisode] = useState({
            title: 'Знакомьтесь, Узумаки Наруто!',
            season: 1,
            num: 1,
            poster: 'https://gen.jut.su/uploads/preview/9991/0/1/1_1521204719.jpg',
            description: 'Хулиган, по имени Узумаки Наруто, хочет стать самым сильным Шиноби и главой деревни – Хокаге. После провала экзамена в академии, он знакомится с вторым экзаменатором – Мизуки, который говорит ему украсть свиток с техниками. Правда, вора быстро находит Ирука-сенсей, и вступает в битву с Мизуки. Во-время этой битвы Наруто узнает что в нем заключен девятихвостый лис, который двенадцать лет назад напал на деревню..',
            video_url: 'https://r41.kujo-jotaro.com/naruto/1/1.480.1f89a08c65b0c303.mp4?hash1=3f950f3dd0451c0bbefdd0496aa8d8a3&hash2=3168021744d1ca34fa7a084b773c0b67'
    });
    const [currentSeason, setCurrentSeason] = useState({
            title: 'Введение',
            num: 1,
    });
    const [timeControlsEnabled, setTimeControlsEnabled] = useState(false);

    /// console.log(videoRef)
   
    const videoHandler = (control) => {
        if (control === "play") {
            videoRef.current.play();
            setPlaying(true);
            setControlsVisible(false);
            var vid = document.getElementById("video1");
            setVideoTime(vid.duration);
        } else if (control === "pause") {
            videoRef.current.pause();
            setPlaying(false);
            setControlsVisible(true);
        }
        setTimeControlsEnabled(true);
    };

    const videoVolumeUpdate = (volume) => {
        videoRef.current.volume = volume;
    }

    const fastForward = () => {
        videoRef.current.currentTime += 5;
    };

    const revert = () => {
        videoRef.current.currentTime -= 5;
    };

    const toogleFullScreen = () => {
        if (screenfull.isEnabled) {
            screenfull.request(playerRef.current);
        }
    }

    const exitFullScreen = () => {
        if (screenfull.isEnabled) {
            screenfull.exit();
        }
    }

    window.setInterval(function () {
        setCurrentTime(videoRef.current?.currentTime);
        setProgress((videoRef.current?.currentTime / videoTime) * 100);
    }, 1000);

    return (
        <div className="app">
            <div className="playerContainer" ref={playerRef}>
                <video
                    id="video1"
                    ref={videoRef}
                    className="video"
                    src={currentEpisode.video_url}
                    preload="metadata"
                    poster={currentEpisode.poster}
                    onClick={() => videoHandler("pause")}
                >
                </video>

                <PlayHandler
                   controlsVisible={controlsVisible}
                   videoHandler={videoHandler}
                   playing={playing}
                   setTimeControlsEnabled={setTimeControlsEnabled}
                />

                <PlayerMenu
                   revert={revert}
                   videoHandler={videoHandler}
                   fastForward={fastForward}
                   videoRef={videoRef}
                   toogleFullScreen={toogleFullScreen}
                   exitFullScreen={exitFullScreen}
                   setVideoTime={setVideoTime} 
                   videoTime={videoTime}
                   currentTime={currentTime}
                   setCurrentTime={setCurrentTime}
                   progress={progress}
                   timeControlsEnabled={timeControlsEnabled}
                   playing={playing}
                   videoVolumeUpdate={videoVolumeUpdate}
                   currentEpisode={currentEpisode}
                   setCurrentEpisode={setCurrentEpisode}
                   currentSeason={currentSeason}
                   setCurrentSeason={setCurrentSeason}
                />

            </div>
        </div>
    );
};

export default Home;