import React from 'react';

import './styles.scss';

const EpisodeCard = ({
    title, description, preview, number
}) => {
    return (
        <div className="episodeCard">
            <div>
            <img
                className="episodeCardImage"
                alt=""
                src={preview}
            />
            <div>
                {number}
            </div>
            <div>
                {title}
            </div>
            <div>
                {description}
            </div>

            </div>
  </div>
    );
};

export default EpisodeCard;