import React from 'react';
import videojs from 'video.js'
import 'video.js/dist/video-js.css';
import './Media.css'
import {useSwipeable} from "react-swipeable";
import { useHistory } from "react-router-dom";
import {VideoJsPlayer} from "./api.video/VideoJsPlayer";


export function Media( props )  {
    document.body.style = 'background: '+props.work.background_color+';';

    React.useEffect(() => {
        window.removeEventListener('keydown', handleKeyDown)
        if(props.current_work_state.value === null || props.current_work_state.value === props.work.slug){
            window.addEventListener("keydown", handleKeyDown, false);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [props.current_work_state]);


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
        onSwipedRight: (eventData) => handleClick(props.work.prev_entry),
        onSwipedLeft: (eventData) => handleClick(props.work.next_entry),
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
            case 'ArrowLeft': handleClick(props.work.prev_entry); break;
            case 'ArrowRight': handleClick(props.work.next_entry); break;
            default: break;
        }

    }
    let media_content = null;
    if(props.work.type === "video") {
        media_content = <VideoJsPlayer current_work_state={props.current_work_state} windowHeight={props.windowHeight} windowWidth={props.windowWidth} api_video_code={props.work.api_video_code} />;
    }else{
        media_content = <img src={`/media/src/${props.work.src}`} alt="Logo" /> ;

    }
    return (
        <div {...swipe_handlers}   className="media_wrapper" >
            <div>asasdasdd</div>
            {media_content}
        </div>
    );
}