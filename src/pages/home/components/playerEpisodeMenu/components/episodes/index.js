import React, { useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import classNames from "classnames";

import './styles.scss';

const Episodes = ({
    episodes, setEpisodes, init_episodes, setCurrentEpisode, currentEpisode, currentSeason
}) => {
    const fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        console.log('fetch more')
        setInterval(() => {
            setEpisodes(episodes.concat(init_episodes))
        }, 1500);
    };

    const chooseEpisodes = (item) => {
        setCurrentEpisode(item);

    }
    
    return (
        <InfiniteScroll
          dataLength={episodes.length}
          // onScroll={onScroll}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {episodes.map((item, index) => (
            <div
            key={index}
            className={classNames("episodeCard", {
                activeEpisode: item.num === currentEpisode.num
            })}
            >
            <img src={item.poster} className="episodePoster"/>
            <div className="episodeCardText">
            <div className="episodeCardNumTitle">
              <div className="episodeCardNum">{item.num}</div>
              <div className="episodeCardTitle">{item.title}</div>
            </div>
            <div className="episodeCardDescription">{item.description}</div>
            </div>
            </div>
          ))}
        </InfiniteScroll>
    );
};

export default Episodes;