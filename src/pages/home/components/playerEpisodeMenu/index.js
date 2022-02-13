import React, { useState } from 'react';
import screenfull from 'screenfull';

import './styles.scss';

import PlayerMenu from '../../../../assets/images/player-menu.svg';

import Seasons from './components/seasons';
import Episodes from './components/episodes';
import PlayerEpisodeMenuHeader from './components/header';

const init_episodes = [
{
    title: 'Знакомьтесь, Узумаки Наруто!',
    num: 1,
    season: 1,
    poster: 'https://gen.jut.su/uploads/preview/9991/0/1/1_1521204719.jpg',
    description: 'Хулиган, по имени Узумаки Наруто, хочет стать самым сильным Шиноби и главой деревни – Хокаге. После провала экзамена в академии, он знакомится с вторым экзаменатором – Мизуки, который говорит ему украсть свиток с техниками. Правда, вора быстро находит Ирука-сенсей, и вступает в битву с Мизуки. Во-время этой битвы Наруто узнает что в нем заключен девятихвостый лис, который двенадцать лет назад напал на деревню..',
    video_url: 'https://r41.kujo-jotaro.com/naruto/1/1.480.1f89a08c65b0c303.mp4?hash1=3f950f3dd0451c0bbefdd0496aa8d8a3&hash2=3168021744d1ca34fa7a084b773c0b67'
}, {
    title: 'Конохамару!',
    num: 2,
    season: 1,
    poster: 'https://gen.jut.su/uploads/preview/9991/0/1/2_1521204723.jpg',
    description: 'Во-время спора с третьим Хокаге по поводу фотографии на карточку Шиноби, Наруто знакомится с внуком третьего - Конохамару, после чего у них происходит конфликт, который пытается остановить Эбису. Конохамару, наблюдая за поведением Наруто, увидел в него сенсея, и начинает за ним следовать..',
    video_url: 'https://r41.kujo-jotaro.com/naruto/1/3.480.19076077e692ecfe.mp4?hash1=67903093b19f7a267483201f55fd15fc&hash2=d357cd2f8289d2f4a45c47d6620d7748'
  },
  {
    title: 'Саске и Сакура: друзья или враги?',
    num: 3,
    season: 1,
    poster: 'https://gen.jut.su/uploads/preview/9991/0/1/3_1521204726.jpg',
    description: 'Всех генинов в академии Шиноби ждало распределение на команды. Наруто попал в команду номер 7, в которой, помимо него, состоят: Сакура Харуно и Учиха Саске. Сакура - девушка, которая нравится Наруто, а Саске - гений академии, которого Наруто недолюбливает. Используя свое мастерство, Наруто всеми способами пытается добиться Сакуру и побить Саске..',
    video_url: 'https://r41.kujo-jotaro.com/naruto/1/3.480.19076077e692ecfe.mp4?hash1=67903093b19f7a267483201f55fd15fc&hash2=d357cd2f8289d2f4a45c47d6620d7748'
  },
  {
    title: 'Трио! Испытание на выживание',
    num: 4,
    season: 1,
    poster: 'https://gen.jut.su/uploads/preview/9991/0/1/4_1521204730.jpg',
    description: 'Команда номер семь знакомится со своим сенсеем - Хатаке Какаши, который сообщает, что экзамен на генина - это лишь первый шаг к тому, чтобы стать генином. Теперь Наруто, Саске и Сакуре необходимо пройти специальный тест - отобрать два бубенчика у Какаши. При этом пройдут только два человека, а тот, кто в конце теста окажется без бубенчика - возвращается в академию. Параллельно третий Хокаге сообщает Ируке что экзамен у Какаши провалиливсе студенты без исключения.',
    video_url: 'https://r41.kujo-jotaro.com/naruto/1/4.480.55922cb528d6fdcf.mp4?hash1=6197ac85d6eb1341e39196f6dda0a36a&hash2=448f9abcaf4bc52436a8c3ddddd1358c'
  },
  {
    title: 'Дисквалифицированы? Заключение Какаши',
    num: 5,
    season: 1,
    poster: 'https://gen.jut.su/uploads/preview/9991/0/1/5_1521204734.jpg',
    description: 'Члены команды номер 7 даже близко не подбираются к бубенчикам: Наруто проигрывает в битве тайдзюцу, Саске в ниндзюцу, а Сакура попадает в гендзюцу, после чего Какаши сообщает, что команда номер 7 провалила его экзамен. Теперь команде осталось только ждать решения Какаши..',
    video_url: 'https://r41.kujo-jotaro.com/naruto/1/5.480.d6b4439a3af2d9c5.mp4?hash1=5859655022ba74a23e2b9a89e91ac046&hash2=7e148205154eb8752f1a2fed9dc35cc1'
  }
];

const init_seasons = [
    {
        title: 'Введение',
        num: 1,
    },
    {
        title: 'Страна Волн',
        num: 2,
    },
    {
        title: 'Экзамен на звание Чунина',
        num: 3,
    },
    {
        title: 'Вторжение в Селение Листвы',
        num: 4,
    },
];


const PlayerEpisodeMenu = ({
    fastForward, currentEpisode, setCurrentEpisode, currentSeason, setCurrentSeason, isOpen, setIsOpen 
}) => {
    const [seasons, setSeasons] = useState(init_seasons);
    const [episodes, setEpisodes] = useState(init_episodes);
    const [isSeasonsVisible, setIsSeasonsVisible] = useState(false);

    const onMouseLeave = () => {
       setIsOpen(false)
    }

    const onMouseMove = () => {
        setIsOpen(true)
    }

    const episodeMenuHover = () => {
        setIsOpen(true)
    }

    const episodeMenuUnhover = () => {
        setIsOpen(false)
    }

    const changeSeasonsVisibility = (value) => {
        setIsSeasonsVisible(value)
    }

    return (
        <div className="playerEpisodeContainer">
            <div
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseMove}
            >
            <img
                className="playerMenuControlsIcon"
                onClick={fastForward}
                alt=""
                src={PlayerMenu}
            />
            </div>

            <div
            className="episodeMenuHoverContainer"
            onMouseMove={episodeMenuHover}
            onMouseLeave={episodeMenuUnhover}
            hidden={!isOpen}
            >
                <div>
                <PlayerEpisodeMenuHeader
                        currentSeason={currentSeason}
                        changeSeasonsVisibility={changeSeasonsVisibility}
                    />
                <div
                   className="episodeMenu"
                >
                    <div className="episodeMenuBody">
                    { !isSeasonsVisible &&
                    <Episodes
                    episodes={episodes}
                    currentEpisode={currentEpisode}
                    setCurrentEpisode={setCurrentEpisode}
                    currentSeason={currentSeason}
                    init_episodes={init_episodes}
                    setEpisodes={setEpisodes}
                    />
                    }
                    { isSeasonsVisible &&
                    <Seasons
                    seasons={seasons}
                    setSeasons={setSeasons}
                    init_seasons={init_seasons}
                    changeSeasonsVisibility={changeSeasonsVisibility}
                    setCurrentSeason={setCurrentSeason}
                    currentSeason={currentSeason}
                    />
                    }
                    </div>
                    
                </div>
                </div>
             
            </div>
            
        </div>
    );
};

export default PlayerEpisodeMenu;