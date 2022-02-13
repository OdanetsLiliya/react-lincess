import React, { useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import classNames from "classnames";

import './styles.scss';

const Seasons = ({
    seasons, setSeasons, init_seasons, changeSeasonsVisibility, setCurrentSeason, currentSeason
}) => {
    const fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        setTimeout(() => {
            setSeasons(seasons.concat(init_seasons))
        }, 1500);
    };

    const goToEpisodes = (item) => {
        setCurrentSeason(item);
        changeSeasonsVisibility(false);
    }

    return (
        <InfiniteScroll
          dataLength={seasons.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {seasons.map((item, index) => (
            <div
            key={index}
            className={classNames("seasonContainer", {
                activeSeason: item.num === currentSeason.num
            })}
            onClick={() => goToEpisodes(item)}
            >
               <div className="seasonTitle">
               {item.title}
               </div>
            </div>
          ))}
        </InfiniteScroll>
    );
};

export default Seasons;