import React, { useState, forwardRef, useRef, HTMLAttributes, DetailedHTMLProps, useImperativeHandle } from 'react';

import * as Dom from '../../../../../../utils/dom';

import InputRange from '../../../../../../components/inputRange';

import NoSound from '../../../../../../assets/images/no-sound.svg';
import Sound_0 from '../../../../../../assets/images/sound-0.svg';
import Sound_1 from '../../../../../../assets/images/sound-1.svg';
import Sound_2 from '../../../../../../assets/images/sound-2.svg';

import { InputRangeHandle } from '../../../../../../components/inputRange';

import './styles.scss';
export interface VolumeControlsPropsType
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    updateVolume: (volume: number) => void,
}
export interface VolumeControlsHandle
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    getIsHovered: () => boolean,
}

const VolumeControls = forwardRef(({ updateVolume }: VolumeControlsPropsType, ref: React.Ref<VolumeControlsHandle>) => {
    const INITIAL_STATE = 60;
    const [soundProgress, setSoundProgress] = useState(INITIAL_STATE / 100);
    const soundProgressBarRef = useRef<InputRangeHandle>(null);
    const volumeControlRef = useRef<HTMLDivElement>(null);

    const [hoveredOutside, setIsHoveredOutside] = useState(false);
    const [hoveredInside, setIsHoveredInside] = useState(false);

    const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const offsetPercent = Dom.getPointerPosition(volumeControlRef?.current, e).x * 100;
        const volume = Number((offsetPercent / 100).toFixed(1))
        updateVolume(volume)
        setSoundProgress(volume)
        soundProgressBarRef?.current?.setInputValue(volume * 100);
    }

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent) => {
        if (soundProgressBarRef?.current?.getIsDrag()) {
            const offsetPercent = Dom.getPointerPosition(volumeControlRef?.current, e).x * 100;
            const volume = Number((offsetPercent / 100).toFixed(1))
            updateVolume(volume)
            setSoundProgress(volume)
            soundProgressBarRef.current.setInputValue(volume * 100);
        }
    }

    const updateSound = () => {
        let value: number;
        if (soundProgress !== 0) {
            value = 0;
        } else {
            value = INITIAL_STATE / 100;
        }
        setSoundProgress(value);
        updateVolume(value);
        soundProgressBarRef?.current?.setInputValue(value * 100);
    }

    const getIcon = () => {
        if (soundProgress === 0) {
            return NoSound;
        } else if (soundProgress > 0 && soundProgress <= 0.3) {
            return Sound_0;
        } else if (soundProgress > 0.3 && soundProgress <= 0.6) {
            return Sound_1;
        } else if (soundProgress > 0.6 && soundProgress <= 1) {
            return Sound_2;
        }
    }

    useImperativeHandle(ref, () => ({
        getIsHovered() {
            return hoveredInside || hoveredOutside;
        }
    }));

    return (
        <div
            className="volumeControlsContainer"
            onMouseOver={() => setIsHoveredInside(true)}
            onMouseOut={() => setIsHoveredInside(false)}
        >
            <img
                onClick={() => updateSound()}
                className="volumeControlsIcon"
                alt=""
                src={getIcon()}
            />
            <div
                className={`volumeControl ${hoveredInside || hoveredOutside ? 'volumeControlHover' : ''}`}
                ref={volumeControlRef}
            >
                <InputRange
                    ref={soundProgressBarRef}
                    onClick={onClick}
                    onMouseMoveHandle={onMouseMove}
                    initialState={INITIAL_STATE}
                    setIsHovered={setIsHoveredOutside}
                />
            </div>

        </div>
    )
});

export default VolumeControls;