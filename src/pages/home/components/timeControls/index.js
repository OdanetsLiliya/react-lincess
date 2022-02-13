import React from 'react';

import './styles.scss';
import Time from '../../../../components/time';

const TimeControls = ({
    videoTime,
    currentTime
}) => (
        <div className="timeControlsContainer">
            <Time
              currentTime={currentTime}
            />
            <div className="timeDel">/</div>
            <Time
              currentTime={videoTime}
            />
        </div>
    );

export default TimeControls;
