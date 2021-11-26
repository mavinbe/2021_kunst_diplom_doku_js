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

    console.log(props.current_work_state)
    React.useEffect(() => {
        window.removeEventListener('keydown', handleKeyDown)
        if(props.current_work_state.value === null || props.current_work_state.value === props.slug){
            window.addEventListener("keydown", handleKeyDown, false);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [props.current_work_state]);
    React.useEffect(() => {
        // make sure Video.js player is only initialized once
        if (!playerRef.current) {

            const videoElement = videoRef.current;
            if (!videoElement) return;

            playerRef.current = videojs(videoElement, props.videoJsOptions, () => {
                console.log("player is ready");

            });
        } else {
            // you can update player here [update player through props]
            // const player = playerRef.current;
            // player.autoplay(props.videoJsOptions.autoplay);
            // player.src(props.videoJsOptions.sources);
        }
    }, [props.videoJsOptions, videoRef]);

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

    function handleClick(slug) {
        const url = `/works/${slug}`
        console.log("props.current_work_state.value")
        console.log(props.current_work_state.value)
        props.current_work_state.set(slug)
        history.push(url);
        console.log("history.push("+url+")");
    }



    const swipe_handlers = useSwipeable({
        onSwipedRight: (eventData) => handleClick(props.prev_entry),
        onSwipedLeft: (eventData) => handleClick(props.next_entry),
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
            case 'ArrowLeft': handleClick(props.prev_entry); break;
            case 'ArrowRight': handleClick(props.next_entry); break;
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