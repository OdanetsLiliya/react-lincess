import React, { HTMLAttributes, DetailedHTMLProps } from 'react';

import './styles.scss';

import Time from '../../../../../../components/time';

export interface TimeControlsPropsType
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
      videoTime: number,
      currentTime: number,
}

const TimeControls: React.FC<TimeControlsPropsType> = ({
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
