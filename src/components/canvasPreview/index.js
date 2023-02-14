import React, { useRef, useEffect, useState } from 'react';

import './styles.scss';

import spritesSection from '../../../../assets/images/naruto-sprite-1.jpeg';
import InputRange from '../../../../components/inputRange';

const CanvasPreview = ({
  canvasCoords,
  showCanvas,
  videoRef,
  setVideoTime,
  timecode, setCurrentTime,
  setHoveredState
}) => {
  const spriteRef = useRef(null);
 
  useEffect(() => {
    if (videoRef && spriteRef) {
      const videoDuration = videoRef.current.duration;
      var vid = document.getElementById("video1");
      if (!isNaN(videoDuration)) {
      setVideoTime(videoRef.current.duration || videoDuration);
      loadSprites()
      }

    }
  }, [videoRef, spriteRef]);

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
      // console.log(tempThumbsImages.src + " loaded:  " + this.width + 'x' + this.height + " with num-frames=" + gNOF);

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
      // console.log("%c Trace: exit thumbs-onload function", "color: Black;");
    }
  }

  const onMouseMove = (e) => {
    const kek = e.nativeEvent.offsetX * 100 / (timeProgressbarRef.current.offsetWidth);
    const timeCodeTemp = kek * videoTime / 100;
    if (videoTime >= timeCodeTemp && timeCodeTemp > 0) {
      const mins = Math.floor(timeCodeTemp / 60);
      let secs = Math.floor(timeCodeTemp - mins * 60);
      if (secs < 10) {
        secs = `0${secs}`
      }
      setShowCanvas(true);
      setTimeCode(`${mins}:${secs}`)
      console.log({ timeCodeTemp, videoTime, s: `${mins}:${secs}` })
      setCanvasCoords(kek)
      captureImage(kek)
      setHoveredState(true);
    }
  }

  const onMouseClick = (e) => {
    const kek = e.nativeEvent.offsetX * 100 / (timeProgressbarRef.current.offsetWidth);
    videoRef.current.currentTime = kek * videoTime / 100;
    setCurrentTime(kek * videoTime / 100);

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


  return (
    <div id="visGroupID" className="visGroup" style={{ left: `calc(${canvasCoords}% - 50px)` }} hidden={!showCanvas}>
      <canvas id="canvasID" className="canvasStyle">
      </canvas>
      <div id="msgID" className="canvasText">{timecode}</div>
      <section id="spritesSectionID" ref={spriteRef} hidden>{spritesSection}</section>
    </div>
  );
};

export default CanvasPreview;