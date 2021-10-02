import React from "react";
import { PlayerSdk } from '@api.video/player-sdk'
import Iframe from 'react-iframe'
import './Player.css';

export class Player extends React.Component {

    render() {
        window.onload = function() {
            // attach the sdk to the existing player
            window.player = new PlayerSdk("iframe");
            window.player.play();
            // window.player can now be used to control the player as described above
        };
        return (
            <div className="shopping-list">
                <h1>Shopping List for {this.props.name}</h1>
                <div className="video-wrapper">
                    <Iframe src="//embed.api.video/vod/vi54sj9dAakOHJXKrUycCQZp" width="100%" height="100%" frameBorder="0"
                            allowFullScreen allow="autoplay"></Iframe>
                </div>

                <ul>
                    <li>Instagram</li>
                    <li>WhatsApp</li>
                    <li>Oculus</li>
                </ul>
            </div>
        );
    }
}