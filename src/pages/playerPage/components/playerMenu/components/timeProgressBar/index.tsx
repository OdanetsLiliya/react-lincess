import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle, HTMLAttributes, DetailedHTMLProps } from 'react';

import './styles.scss';

import { Workout } from '../../../../../../types/workoutTypes';

import InputRange from '../../../../../../components/inputRange';

export interface TimeProgressBarPropsType
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    videoRef: any,
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

const TimeProgressBar = forwardRef(({ videoRef, videoTime, setCurrentTime, currentTime, currentWorkout }: TimeProgressBarPropsType, ref) => {
    const inputRangeRef: any = useRef(null);
    const timeProgressbarRef: any = useRef(null);
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
            inputRangeRef.current.setInputValue(currentTime + valueToAdd);
        },
        inputRangeRefresh() {
            inputRangeRef.current.setInputValue(0);
        },
        inputRangeUpdate() {
            inputRangeRef.current.setInputValue(currentTime);
        }
    }));

    const loadSprites = () => {
        if (currentWorkout) {
        let gNOF: number;
        let canvas: any;
        let widthOfAllSprites: number;
        let tempThumbsImages = new Image();
        // const spritesFn = spriteRef.current.innerHTML;
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

    const onMouseMove = (e: any) => {
        if (timeProgressbarRef?.current) {
            const currentProgress = e.nativeEvent.offsetX /  e.target.clientWidth;
            const timeValue = Math.round(currentProgress *  parseInt(e.target.getAttribute('max'),10));
            const result = new Date(timeValue * 1000).toISOString().substr(11, 8);

            const min = result.substr(3, 2);
            const sec = result.substr(6, 2);
           
            setShowCanvas(true);
            setTimeCode(`${min}:${sec}`)
            setCanvasCoords(currentProgress * 100)
            captureImage(currentProgress * 100)
        }
    }

    const onMouseClick = (value: number) => {
        videoRef.current.currentTime = value;
        setCurrentTime(value);
    }

    const onMouseLeave = () => {
        setShowCanvas(false);
    }

    const captureImage = (coord) => {
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

    function sprite(options) {
        let frameIndex = 0, numberOfFrames = options.numberOfFrames || 1;
        var that: Sprite = {
            context: options.context,
            width:  options.width,
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
                {/* <section id="spritesSectionID" ref={spriteRef} hidden>{currentWorkout.sprites_url}</section> */}
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