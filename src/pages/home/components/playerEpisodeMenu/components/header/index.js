import React from 'react';

import './styles.scss';


const PlayerEpisodeMenuHeader = ({
  changeSeasonsVisibility, currentSeason
}) => (
  <div className="episodeMenuHeader">
    <div className="seasonTitle">
      {currentSeason.title}
    </div>
    <div className="seasonButton" onClick={() => changeSeasonsVisibility(true)}>
      все aрки
    </div>
  </div>
);

export default PlayerEpisodeMenuHeader;