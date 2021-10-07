import React from "react";
import './HomeContent.css';
import { Container, Row, Col } from 'react-grid-system';

export class HomeContent extends React.Component {
    render() {
        function getCol(gif_path) {
            return (
                <Col sm={4} xs={6}>
                    <img src={"/media/"+gif_path}/>
                </Col>
            );
        }

        return (
            <Container>
                <Row>
                    {getCol('1 2 Screen A.gif')}
                    {getCol('GOPR3912.gif')}
                    {getCol('IMG_3131.gif')}
                    {getCol('Follow_G_small.gif')}
                    {getCol('Starren Dummy.gif')}
                    {getCol('look what i\'ve found.gif')}
                    {getCol('abc2_cuted_no_works.gif')}
                    {getCol('2020-01-31T17-40-25-000_live.gif')}
                    {getCol('video.gif')}
                </Row>
            </Container>
        );
    }
}