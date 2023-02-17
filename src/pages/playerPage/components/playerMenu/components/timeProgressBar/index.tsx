import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle, HTMLAttributes, DetailedHTMLProps } from 'react';

import * as Dom from '../../../../../../utils/dom';
import * as TimeUtils from '../../../../../../utils/time';

import './styles.scss';

import { Workout } from '../../../../../../types/workoutTypes';

import InputRange from '../../../../../../components/inputRange';

export interface TimeProgressBarPropsType
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    videoRef: React.RefObject<HTMLVideoElement>,
    videoTime: number,
    currentTime: number,
    setCurrentTime: (time: number) => void;
    currentWorkout: Workout;
}

export interface Sprite {
    update: (num: number) => void,
    render: () => void,
    width: number,
    height: number,
    context?: any,
    image?: any
}

export interface TimeProgressBarHandle
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    inputRangeChange: (num: number) => void,
    inputRangeRefresh: () => void,
    inputRangeUpdate: () => void,
    getIsDrag: () => boolean,
}

const TimeProgressBar = forwardRef((
    {
        videoRef,
        videoTime,
        setCurrentTime,
        currentTime,
        currentWorkout
    }: TimeProgressBarPropsType,
    ref: React.Ref<TimeProgressBarHandle>
) => {
    const inputRangeRef: any = useRef(null);
    const timeProgressbarRef = useRef<HTMLDivElement>(null);

    const [showCanvas, setShowCanvas] = useState(false);
    const [canvasCoords, setCanvasCoords] = useState(0);
    const [timecode, setTimeCode] = useState<string>();
    const [theSpriteItems, setTheSpriteItems] = useState<Sprite>();

    useEffect(() => {
        if (videoTime) {
            loadSprites()
        }
    }, [videoTime]);


    useImperativeHandle(ref, () => ({
        inputRangeChange(valueToAdd: number) {
            const newTime = currentTime + valueToAdd;
            const progress = newTime * 100 / (videoTime || 0);
            inputRangeRef.current.setInputValue(progress);
        },
        inputRangeRefresh() {
            inputRangeRef.current.setInputValue(0);
        },
        inputRangeUpdate() {
            const progress = currentTime * 100 / (videoTime || 0);
            inputRangeRef.current.setInputValue(progress);
        },
        getIsDrag() {
            return inputRangeRef.current.getIsDrag();
        }
    }));

    const loadSprites = () => {
        if (currentWorkout) {
            let gNOF: number;
            let canvas: any;
            let widthOfAllSprites: number;
            let tempThumbsImages = new Image();

            tempThumbsImages.src = currentWorkout.sprites_url;

            tempThumbsImages.onload = function () {
                canvas = document.getElementById('canvasID'); // NOTE: Can NOT use jQuery syntax here:  https://stackoverflow.com/questions/4069982/document-getelementbyid-vs-jquery
                canvas.width = 133;
                canvas.height = 75;
                // @ts-ignore
                const { width, height } = this;
                widthOfAllSprites = width;
                //number of frames (in sprites file)
                gNOF = widthOfAllSprites / canvas.width;
                console.log(tempThumbsImages.src + " loaded:  " + width + 'x' + height + " with num-frames=" + gNOF);

                // Create sprite
                let tempTheSpriteItems: Sprite = sprite({
                    context: canvas.getContext("2d"),
                    image: tempThumbsImages,
                    numberOfFrames: gNOF,
                    width,
                    height
                });

                setTheSpriteItems(tempTheSpriteItems);

                tempTheSpriteItems.render();
                console.log("%c Trace: exit thumbs-onload function", "color: Black;");
            }
        }
    }

    const onMouseMove = (e: MouseEvent) => {
        if (timeProgressbarRef?.current) {
            const newTime = Dom.getPointerPosition(timeProgressbarRef?.current, e).x * videoTime;
            const totalWidth = timeProgressbarRef.current.getBoundingClientRect().width;
            const position = (e.pageX - Dom.findElPosition(timeProgressbarRef?.current).left) / totalWidth;

            if (position >= 0 && position <= 1) {
                setShowCanvas(true);
                setTimeCode(TimeUtils.getTimeCode(newTime))
                setCanvasCoords(position * 100)
                captureImage(position * 100)
                if (inputRangeRef?.current.getIsDrag() && videoRef.current) {
                    videoRef.current.currentTime = Math.round(newTime);
                    setCurrentTime(Math.round(newTime));
                }
            }
        }
    }

    const onMouseClick = (e: MouseEvent) => {
        if (videoRef.current) {
            const newTime = Dom.getPointerPosition(timeProgressbarRef?.current, e).x * videoTime;
            videoRef.current.currentTime = Math.round(newTime);
            setCurrentTime(Math.round(newTime));
        }
    }

    const onMouseLeave = () => {
        setShowCanvas(false);
    }

    const captureImage = (coord: number) => {
        /* 
           coord - current num of secs
           1 sprite for every 10 sec
        */
        const secNum = 10;
        const current_time = coord * videoTime / 100;
        const sprite_num = Math.round(current_time / secNum);
        if (theSpriteItems) {
            theSpriteItems.update(sprite_num);
            theSpriteItems.render();
        }
    };

    function sprite(options: {
        context: any,
        image: HTMLImageElement,
        numberOfFrames: number,
        width: number,
        height: number,
    }) {
        let frameIndex = 0, numberOfFrames = options.numberOfFrames || 1;
        var that: Sprite = {
            context: options.context,
            width: options.width,
            height: options.height,
            image: options.image,
            update: function (newVal) {
                frameIndex = newVal;
            },
            render: function () {
                // Clear the canvas between each full animation
                console.log(frameIndex, frameIndex * that.width / numberOfFrames);
                console.log(that.width / numberOfFrames, that.height);

                const total_h_count = that.height / 75;
                const total_w_count = that.width / 133;

                const h_point = Math.floor(frameIndex / total_w_count);
                const w_point = frameIndex - total_w_count * h_point;

                that.context.clearRect(0, 0, that.width, that.height);
                // Draw the new image
                that.context.drawImage(
                    that.image,
                    w_point * that.width / numberOfFrames,
                    that.height * h_point / total_h_count,
                    that.width / numberOfFrames,
                    that.height,
                    0,
                    0,
                    that.width / numberOfFrames,
                    that.height);
            }
        }
        return that;
    };

    const canvasChild = () => {
        return (
            <div id="visGroupID" className="visGroup" style={{ left: `calc(${canvasCoords}% - 133px*${canvasCoords / 100})` }} hidden={!showCanvas}>
                <canvas id="canvasID" className="canvasStyle">
                </canvas>
                <div id="msgID" className="canvasText">{timecode}</div>
            </div>
        )
    };

    return (
        <div className="timeProgressBar"
            ref={timeProgressbarRef}
        >
            <InputRange
                onMouseMove={onMouseMove}
                onClick={onMouseClick}
                onMouseLeave={onMouseLeave}
                Child={canvasChild()}
                max={videoTime}
                ref={inputRangeRef}
            />
        </div>
    );
});

export default TimeProgressBar;