import React from "react";
import Iframe from 'react-iframe'
import './Player.css';

export class Player extends React.Component {
    render() {
        return (
            <div className="video-wrapper">
                <img alt="bla" height="100px" style={{position: 'absolute', right: '20px'}} src={`https://cdn.api.video/vod/${this.props.api_video_code}/thumbnail.jpg`}/>
                <Iframe src={`https://embed.api.video/vod/${this.props.api_video_code}`} width="100%" height="100%" frameBorder="0"
                        allow="autoplay; fullscreen" allowfullscreen/>
            </div>
        );
    }
}

Player.defaultProps = {
    api_video_code: 'vi54sj9dAakOHJXKrUycCQZp' //PropTypes.element.isRequired
};