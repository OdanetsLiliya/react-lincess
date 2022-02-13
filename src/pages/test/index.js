import React, { useRef, useState } from 'react';
import './styles.scss'

class VideoPlayerTest extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        interval: undefined,
        ctx: undefined
      };
  
      this.grabFrame = this.grabFrame.bind(this);
    }
  
    componentDidMount() {
      this.setState({
        ctx: this.canvas.getContext("2d")
      });
    }
  
    grabFrame() {
      const copyRef = this.video
      console.log(copyRef)
      // const copyRef = React.cloneElement(element, { ref: elementRef });
      const el = React.cloneElement(copyRef);
      console.log(el)
      const tempTime = copyRef.currentTime;
      console.log();
      el.currentTime = 12;
      return this.state.ctx.drawImage(el, 0, 0, 400, 220);
    }
  
    play() {
      if (this.video.paused) {
        if (this.state.interval) {
          clearInterval(this.state.interval);
        }
        this.video.play();
        /* this.setState({
          interval: setInterval(this.grabFrame, 1000 / this.props.fps)
        }); */
      } else {
        clearInterval(this.state.interval);
        this.setState({
          interval: undefined
        });
        this.video.pause();
      }
    }
  
    render() {
      return (
        <div>
          <video width="400" ref={video => (this.video = video)} id="v1" onClick={this.grabFrame.bind(this)}>
            <source
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              type="video/mp4"
            />
          </video>
          <video className="kek" width="400" ref={video => (this.video = video)} id="v" onClick={this.grabFrame.bind(this)}>
            <source
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              type="video/mp4"
            />
          </video>
          <canvas
            ref={canvas => (this.canvas = canvas)}
            width="400"
            height="220"
          />
          <br />
          <button type="button" onClick={this.play.bind(this)}>
            Play
          </button>
        </div>
      );
    }
  }

export default VideoPlayerTest;