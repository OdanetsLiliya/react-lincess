import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';

import './styles.scss';

import spritesSection from '../../../../assets/images/naruto-sprite-1.jpeg';
import InputRange from '../../../../components/inputRange';

const TimeProgressBar = forwardRef(({ videoRef, setVideoTime, videoTime, setCurrentTime, setHoveredState, currentTime }, ref) => {
    const spriteRef = useRef(null);
    const inputRangeRef = useRef(null);
    const timeProgressbarRef = useRef(null);
    const [showCanvas, setShowCanvas] = useState(false);
    const [canvasCoords, setCanvasCoords] = useState(0);
    const [timecode, setTimeCode] = useState();
    const [theSpriteItems, setTheSpriteItems] = useState();

    useEffect(() => {
       if (videoRef && spriteRef) {
            const videoDuration = videoRef.current.duration;
            console.log({ kekkekekekekke: videoRef.current})
            var vid = document.getElementById("video1");
            console.log(vid.duration)
            console.log(videoDuration)
            console.log(videoRef, spriteRef)
            setVideoTime(videoRef.current.duration);
            loadSprites()
            
        }
    }, [videoRef, spriteRef]);

    useImperativeHandle(ref, () => ({
        inputRangeChange(valueToAdd){
            // console.log({ currentTime: videoRef.current.currentTime, valueToAdd: valueToAdd / 60 })
            // onMouseClick(videoRef.current.currentTime + valueToAdd);
            // videoRef.current.currentTime = currentTime + valueToAdd;
            // setCurrentTime(currentTime + valueToAdd);
            inputRangeRef.current.setInputValue((currentTime + valueToAdd) / videoTime * 100);
        }
    }));

    const loadSprites = () => {
        let gNOF;
        let canvas;
        let widthOfAllSprites;
        let tempThumbsImages = new Image();
        const spritesFn = spriteRef.current.innerHTML;
        tempThumbsImages.src = spritesFn;
        tempThumbsImages.onload = function () {
            canvas = document.getElementById('canvasID'); // NOTE: Can NOT use jQuery syntax here:  https://stackoverflow.com/questions/4069982/document-getelementbyid-vs-jquery
            canvas.width = 100;
            canvas.height = 75;

            widthOfAllSprites = this.width;
            gNOF = widthOfAllSprites / canvas.width;						//number of frames (in sprites file)
            console.log(tempThumbsImages.src + " loaded:  " + this.width + 'x' + this.height + " with num-frames=" + gNOF);

            // Create sprite
            let tempTheSpriteItems = sprite({
                context: canvas.getContext("2d"),
                image: tempThumbsImages,
                numberOfFrames: gNOF,
                width: this.width,
                height: this.height
            });

            setTheSpriteItems(tempTheSpriteItems);

            tempTheSpriteItems.render();
            console.log("%c Trace: exit thumbs-onload function", "color: Black;");
        }
    }

    const onMouseMove = (e) => {
        const kek = e.nativeEvent.offsetX * 100 / (timeProgressbarRef.current.offsetWidth);
        const timeCodeTemp = kek * videoTime / 100;
        if(videoTime >= timeCodeTemp && timeCodeTemp>0) {
        const mins = Math.floor(timeCodeTemp / 60);
        let secs = Math.floor(timeCodeTemp - mins*60);
        if(secs < 10){
            secs = `0${secs}`
        }
        setShowCanvas(true);
        setTimeCode(`${mins}:${secs}`)
        console.log({timeCodeTemp, videoTime, s: `${mins}:${secs}`})
        setCanvasCoords(kek)
        captureImage(kek)
        setHoveredState(true);
        }
    }

    const onMouseClick = (value) => {
        videoRef.current.currentTime = value * videoTime / 100;
        setCurrentTime(value * videoTime / 100);
    }

    const onMouseLeave = () => {
        setShowCanvas(false);
        setHoveredState(false);
    }

    const captureImage = (coord) => {
        /* 
           coord - current num of secs
           1 sprite for every 5 sec
        */
        const current_time = coord * videoTime / 100;
        const sprite_num = Math.round(current_time / 5);
       
        theSpriteItems.update(sprite_num);
        theSpriteItems.render();
    };

    function sprite(options) {
        var that = {},
            frameIndex = 0,
            numberOfFrames = options.numberOfFrames || 1;
        that.context = options.context;
        that.width = options.width;
        that.height = options.height;
        that.image = options.image;

        that.update = function (newVal) {
            frameIndex = newVal;
        };

        that.render = function () {
            // Clear the canvas between each full animation
            console.log(frameIndex, frameIndex * that.width / numberOfFrames);
            console.log(that.width / numberOfFrames, that.height);

            const total_h_count = that.height / 75;
            const total_w_count = that.width / 100;

            const h_point = Math.floor(frameIndex / total_w_count);
            const w_point = frameIndex - total_w_count * h_point;


            console.log(that.height)
            console.log({ h_point, w_point, h: that.height * h_point / 75 })

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
        };
        return that;
    };

    const canvasChild = () => {
        return(
        <div id="visGroupID" className="visGroup" style={{ left: `calc(${canvasCoords}% - 100px*${canvasCoords / 100})` }} hidden={!showCanvas}>
                    <canvas id="canvasID" className="canvasStyle">
                    </canvas>
                    <div id="msgID" className="canvasText">{timecode}</div>
                    <section id="spritesSectionID" ref={spriteRef} hidden>{spritesSection}</section>
        </div>
        )
    };

    return (
        <div className="timeProgressBar"
        ref={timeProgressbarRef}
        >
            <InputRange
                ref={inputRangeRef}
                onMouseMove={onMouseMove}
                onClick={onMouseClick}
                onMouseLeave={onMouseLeave}
                Child={canvasChild()}
            />     
        </div>
    );
});

export default TimeProgressBar;

/*
 <div className="time_progressbarContainer"
                onMouseMove={onMouseMove}
                onClick={onMouseClick}
                onMouseLeave={onMouseLeave}
                ref={timeProgressbarRef}
            >
                <div
                    style={{ width: `${progress}%` }}
                    className="time_progressBar"
                >
                </div>
                <div id="visGroupID" className="visGroup" style={{ left: `${canvasCoords}%` }} hidden={!showCanvas}>
                    <canvas id="canvasID" className="canvasStyle">
                    </canvas>
                    <div id="msgID" className="canvasText">{timecode}</div>
                    <section id="spritesSectionID" ref={spriteRef} hidden>{spritesSection}</section>
                </div>

            </div>

*/