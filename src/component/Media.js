import React from 'react';
import videojs from 'video.js'
import 'video.js/dist/video-js.css';
import './Media.css'
import {useSwipeable} from "react-swipeable";
import { useHistory } from "react-router-dom";
import {VideoJsPlayer} from "./api.video/VideoJsPlayer";
import {contain} from "../helpers/DimensionFitter";
import {Col, Container, Row, setConfiguration} from "react-grid-system";


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

    function handleClickLeft() {
        handleClick(props.work.prev_entry)
    }

    function handleClickRight() {
        handleClick(props.work.next_entry)
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
    const contain_dimensions = contain({width: props.work.width, height:props.work.height}, {width: props.windowWidth, height: props.windowHeight*0.8});

    let media_content = null;
    if(props.work.type === "video") {
        media_content = <VideoJsPlayer current_work_state={props.current_work_state} windowHeight={props.windowHeight} windowWidth={props.windowWidth} api_video_code={props.work.api_video_code} volume={props.work.volume}/>;
    }else{
        media_content = <img  style={{width: '100%'}}  src={`/media/src/${props.work.src}`} alt="Logo" /> ;

    }
    return (
        <div>
            <div className="media_wrapper">
                <Container style={{maxWidth:`${contain_dimensions.width}px`}}>
                    <Row justify="between">
                        <Col md={4} sm={12} xs={12} style={{display:'flex', alignItems:'flex-end'}}>
                            <div className="meta_year">{props.work.year}</div>

                        </Col>
                        <Col md={4} sm={12} xs={12} style={{textAlign:'center', fontSize:'140%'}}>
                            <div className="meta_name" dangerouslySetInnerHTML={{ __html: props.work.name }} ></div>
                        </Col>
                        <Col md={4} sm={12} xs={12} style={{display:'flex', alignItems:'flex-end', direction:"rtl"}}>
                            <div className="meta_comment">{props.work.comment}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <div  className="media_container">
                                {media_content}
                            </div>
                        </Col>
                    </Row>
                    <Row>

                        <Col xs={6} style={{textAlign:'left'}}>
                            <div className="meta_material">{props.work.material}</div>
                        </Col>
                        <Col xs={6} style={{textAlign:'right'}}>
                            <div className="meta_dimensions">{props.work.dimensions}</div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div>
                asddas<br/>
                asddas<br/>
                asddas<br/>
                asddas<br/>
                asddas<br/>
                asddas<br/>
                asddas<br/>
                asddas<br/>
                asddas<br/>
            </div>
            <div className="navi_media">
                <Container style={{maxWidth:'auto'}}>
                    <Row>
                        <Col className="navi_media_entry" key="navi_left"  md={4} sm={4} xs={4} >
                            <a onClick={handleClickLeft} href="#">
                                <div className="navi-left-button">
                                    <img src="/icon/arrow_left.png"></img>
                                </div>
                            </a>
                        </Col>
                        <Col className="navi_media_entry" key="navi_home"  md={4} sm={4} xs={4} >

                            <div className="navi-home-button">
                                <a href="/">
                                    <img src="/icon/home.png"></img>
                                </a>
                            </div>

                        </Col>
                        <Col className="navi_media_entry" key="navi_right"  md={4} sm={4} xs={4} >
                            <a onClick={handleClickRight} href="#">
                                <div className="navi-right-button">
                                    <img src="/icon/arrow_right.png"></img>
                                </div>
                            </a>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}