import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

import './styles.scss';

export interface TimeType
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  currentTime: number
}

const Time: React.FC<TimeType> = ({ currentTime }) => {
  return <p className="controlsTime">
    {Math.floor(currentTime / 60) +
      ":" +
      ("0" + Math.floor(currentTime % 60)).slice(-2)}
  </p>
};

export default Time;