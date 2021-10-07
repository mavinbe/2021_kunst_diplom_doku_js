import React from "react";
import { PlayerSdk } from '@api.video/player-sdk'
import Iframe from 'react-iframe'
import './Player.css';

export class Player extends React.Component {
    render() {
        return (
            <div className="video-wrapper">
                <img alt="bla" height="100px" style={{position: 'absolute', right: '20px'}} src="https://cdn.api.video/vod/vi18U76WKv7HUCTynVPnR2xJ/thumbnail.jpg"/>
                <Iframe onload="asd" src="https://embed.api.video/vod/vi54sj9dAakOHJXKrUycCQZp" width="100%" height="100%" frameBorder="0"
                        allow="autoplay; fullscreen" allowfullscreen/>
            </div>
        );
    }
}