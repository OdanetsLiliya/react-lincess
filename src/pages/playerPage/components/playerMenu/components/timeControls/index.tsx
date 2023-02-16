import React, { HTMLAttributes, DetailedHTMLProps } from 'react';

import './styles.scss';

import * as TimeUtils from '../../../../../../utils/time';
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
    <div className="controlsTime">
      {TimeUtils.getTimeCode(currentTime)}
    </div>
    <div className="timeDel">&nbsp;/&nbsp;</div>
    <div className="controlsTime">
      {TimeUtils.getTimeCode(videoTime)}
    </div>
  </div>
);

export default TimeControls;
