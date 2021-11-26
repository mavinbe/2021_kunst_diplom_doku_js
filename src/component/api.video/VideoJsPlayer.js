import React from 'react';
import videojs from 'video.js'
import 'video.js/dist/video-js.css';
import './VideoJsPlayer.css'
import {useSwipeable} from "react-swipeable";
import { useHistory } from "react-router-dom";


export function VideoJsPlayer( props )  {
    document.body.style = 'background: '+props.backround_color+';';
    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);
    const options  = props;

    React.useEffect(() => {
        window.addEventListener("keydown", handleKeyDown, false);
        return () => window.removeEventListener('keydown', handleKeyDown);
    } );
    React.useEffect(() => {
        // make sure Video.js player is only initialized once
        if (!playerRef.current) {

            const videoElement = videoRef.current;
            if (!videoElement) return;

            playerRef.current = videojs(videoElement, options, () => {
                console.log("player is ready");

            });
        } else {
            // you can update player here [update player through props]
            // const player = playerRef.current;
            // player.autoplay(options.autoplay);
            // player.src(options.sources);
        }
    }, [options, videoRef]);

    // Dispose the Video.js player when the functional component unmounts
    React.useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player) {
                player.dispose();
                playerRef.current = null;
                document.removeEventListener("keyDown", handleKeyDown, false);
            }
        };
    }, [playerRef]);

    const history = useHistory();

    function handleClick(url) {
        history.push(url);
    }



    const swipe_handlers = useSwipeable({
        onSwipedRight: (eventData) => handleClick(props.url_to_prev_entry),
        onSwipedLeft: (eventData) => handleClick(props.url_to_next_entry),
        ...{
            delta: 10,                            // min distance(px) before a swipe starts. *See Notes*
            preventDefaultTouchmoveEvent: false,  // call e.preventDefault *See Details*
            trackTouch: true,                     // track touch input
            trackMouse: true,                    // track mouse input
            rotationAngle: 0,                     // set a rotation angle
        },
    });

    function handleKeyDown(e) {
        console.log(e)
        switch (e.code) {
            case 'ArrowLeft': handleClick(props.url_to_prev_entry); break;
            case 'ArrowRight': handleClick(props.url_to_next_entry); break;
            default: break;
        }

    }

    return (
        <div {...swipe_handlers}   className="video_wrapper" >

            <div className="video_container" >
                <div>asd</div>
                <video ref={videoRef} className="video-js"/>
            </div>
        </div>
    );
}