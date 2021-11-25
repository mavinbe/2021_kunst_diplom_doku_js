import React from 'react';
import videojs from 'video.js'
import 'video.js/dist/video-js.css';
import './VideoJsPlayer.css'

export class VideoJsPlayer extends React.Component {
    componentDidMount() {
        document.body.style = 'background: '+this.props.backround_color+';';
        // instantiate Video.js
        let options = {...this.props, sources: [{src: `https://cdn.api.video/vod/${this.props.api_video_code}/hls/manifest.m3u8`}]};
        console.log(options);
        this.player = videojs(this.videoNode, options, function onPlayerReady() {
            console.log('onPlayerReady', this)
        });
    }

    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }

    // wrap the player in a div with a `data-vjs-player` attribute
    // so videojs won't create additional wrapper in the DOM
    // see https://github.com/videojs/video.js/pull/3856
    render() {
        return (
            <div className="video_wrapper">
                <div className="video_container" >
                    <video ref={node => this.videoNode = node} className="video-js"/>
                </div>
            </div>
        )
    }
}