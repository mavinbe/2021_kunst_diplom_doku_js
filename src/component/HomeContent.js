import React from "react";
import './HomeContent.css';
import { Container, Row, Col } from 'react-grid-system';
import {works_config} from '../description/works';



export class HomeContent extends React.Component {

    constructor(props) {
        super(props);

        // groups entries by year
        let works_config_grouped_by_years = works_config.reduce(function (accu, current) {
            if(!(current.year in accu)){
                accu[current.year] = [];
            }
            accu[current.year].push(current);
            return accu;
        },{});

        this.year_sections = Object.keys(works_config_grouped_by_years).map(function(key) {
            let current_year_group = works_config_grouped_by_years[key];

            let rendered_tiles = current_year_group.map((body, index) =>
                <Col key={key+index}  md={12} sm={12} xs={12} >
                    <div className="tile">
                        <span className="title">{body.name}</span>
                        <a href={`/works/${body.slag}`} className="tile-link" style={{backgroundImage: `url("/media/gifs/${body.thumbnail}")`}}>&nbsp;</a>
                    </div>
                </Col>
            );

            return [(
                <Col key={key}  md={12} sm={12} xs={12} >
                    <div className="year">
                        {key}
                    </div>
                </Col>
            ),rendered_tiles] ;
        });


        console.log(this.year_sections)

    }

    render() {


        return (
            <Container>
                <Row>
                    {this.year_sections}
                </Row>
            </Container>
        );
    }
}