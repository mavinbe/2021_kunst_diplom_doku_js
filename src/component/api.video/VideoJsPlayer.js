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
        muted: false,
        autoplay: true,
        controls: true,
        playsinline: true,
        fluid: true,
        fill: true,
        //responsive: false,
        loop: true,
        sources: [{src: `https://cdn.api.video/vod/${props.api_video_code}/hls/manifest.m3u8`}],
        //poster: `https://cdn.api.video/vod/${props.api_video_code}/thumbnail.jpg`
        controlBar: {
            fullscreenToggle: false,
            pictureInPictureToggle: false,
            subsCapsButton: false,
            volumePanel: false,
            playToggle: false,
            remainingTimeDisplay: false
        },
        bigPlayButton: false
    }

    React.useEffect(() => {
        // make sure Video.js player is only initialized once
        if (!playerRef.current) {

            const videoElement = videoRef.current;
            if (!videoElement) return;

            playerRef.current = videojs(videoElement, videoJsOptions, () => {
                console.log("player is ready");
                const player = playerRef.current;
                //console.log(player.play());

            });
            if(props.volume){
                playerRef.current.volume(props.volume)
            }

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

    function handleKeyDown(e) {
        const player  = playerRef.current;
        if(e.code === 'ArrowUp'){
            player.play();
        }


    }

    const swipe_handlers = useSwipeable({
        onTap: (eventData) => {
            const player  = playerRef.current;
            player.play();
        },
        ...{
            delta: 10,                            // min distance(px) before a swipe starts. *See Notes*
            preventDefaultTouchmoveEvent: false,  // call e.preventDefault *See Details*
            trackTouch: true,                     // track touch input
            trackMouse: true,                    // track mouse input
            rotationAngle: 0,                     // set a rotation angle
        },
    });
    return (
        <video ref={videoRef} className="video-js"/>
    );
}