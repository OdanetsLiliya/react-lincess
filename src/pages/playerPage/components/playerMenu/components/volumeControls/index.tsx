import React, { useState, useRef, HTMLAttributes, DetailedHTMLProps } from 'react';

import './styles.scss';

import NoSound from '../../../../../../assets/images/no-sound.svg';
import Sound_0 from '../../../../../../assets/images/sound-0.svg';
import Sound_1 from '../../../../../../assets/images/sound-1.svg';
import Sound_2 from '../../../../../../assets/images/sound-2.svg';

import InputRange from '../../../../../../components/inputRange';

export interface VolumeControlsPropsType
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
      updateVolume: (volume: number) => void,
}

const VolumeControls: React.FC<VolumeControlsPropsType> = ({ updateVolume }) => {
    const INITIAL_STATE = 60;
    const [soundProgress, setSoundProgress] = useState(INITIAL_STATE / 100);
    const soundProgressBarRef: any = useRef();

    const onClick = (value) => {
        const offsetPercent = value;
        const volume = Number((offsetPercent / 100).toFixed(1))
        updateVolume(volume)
        setSoundProgress(volume)
    }

    const updateSound = () => {
        let value;
        if(soundProgress !== 0) {
            value = 0;
        } else {
            value = INITIAL_STATE / 100;
        }
        setSoundProgress(value);
        updateVolume(value);
        soundProgressBarRef.current.setInputValue(value * 100);
    }

    const getIcon = () => {
        if (soundProgress === 0) {
            return NoSound;
        } else if(soundProgress > 0 && soundProgress <= 0.3){
            return Sound_0;
        } else if(soundProgress > 0.3 && soundProgress <= 0.6){
            return Sound_1;
        } else if(soundProgress > 0.6 && soundProgress <= 1){
            return Sound_2;
        }
    }

    return (
        <div className="volumeControlsContainer">
            <img
                onClick={() => updateSound()}
                className="volumeControlsIcon"
                alt=""
                src={getIcon()}
            />
            <div className="volumeControl">
              <InputRange
                 // ref={soundProgressBarRef}
                 onClick={onClick}
                 initialState={INITIAL_STATE}
               />
            </div>

        </div>
    )
};

export default VolumeControls;