import React from 'react';
import videojs from 'video.js'
import 'video.js/dist/video-js.css';
import './VideoJsPlayer.css'
import {useSwipeable} from "react-swipeable";
import { useHistory } from "react-router-dom";


export function VideoJsPlayer( props )  {
    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);

    const videoJsOptions = {
        muted: true,
        autoplay: false,
        controls: false,
        fluid: true,
        loop: true,
        sources: [{src: `https://cdn.api.video/vod/${props.api_video_code}/hls/manifest.m3u8`}]

    }

    React.useEffect(() => {
        // make sure Video.js player is only initialized once
        if (!playerRef.current) {

            const videoElement = videoRef.current;
            if (!videoElement) return;

            playerRef.current = videojs(videoElement, videoJsOptions, () => {
                console.log("player is ready");

            });
        } else {
            // you can update player here [update player through props]
            // const player = playerRef.current;
            // player.autoplay(props.videoJsOptions.autoplay);
            // player.src(props.videoJsOptions.sources);
        }
    }, [videoJsOptions, videoRef]);

    // Dispose the Video.js player when the functional component unmounts
    React.useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);



    return (
            <div className="video_container" >
                <video ref={videoRef} className="video-js"/>
            </div>
    );
}