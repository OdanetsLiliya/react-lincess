import React from 'react';

import './styles.scss';

const Time = ({ currentTime }) => (
    <p className="controlsTime">
                {Math.floor(currentTime / 60) +
                    ":" +
                    ("0" + Math.floor(currentTime % 60)).slice(-2)}
    </p>
);

export default Time;