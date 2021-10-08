import React from "react";
import './HomeContent.css';
import { Container, Row, Col } from 'react-grid-system';
import {works_config} from '../description/works';



export class HomeContent extends React.Component {
    rendered_tiles = works_config.map((body, key) =>
        <Col md={12} sm={12} xs={12} >
            <div className="tile">
                {body.name}
                <a href={`/works/${body.slag}`} className="tile-link" style={{backgroundImage: `url("/media/gifs/${body.thumbnail}")`}}>&nbsp;</a>
            </div>
        </Col>
    );

    render() {


        return (
            <Container>
                <Row>
                    {this.rendered_tiles}
                </Row>
            </Container>
        );
    }
}