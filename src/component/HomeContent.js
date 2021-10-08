import React from "react";
import './HomeContent.css';
import { Container, Row, Col } from 'react-grid-system';

export class HomeContent extends React.Component {
    render() {
        function getCol(gif_path) {
            return (
                <Col md={12} sm={12} xs={12}>
                    <a href="#" className="tiles" style={{backgroundImage: `url("${process.env.PUBLIC_URL}/media/gifs/${gif_path}")`}}>&nbsp;</a>

                </Col>
            );
        }

        return (
            <Container>
                <Row>
                    {getCol('2016_03_30_IMG_2353_print_v2.gif')}
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