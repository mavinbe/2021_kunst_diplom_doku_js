import React from "react";
import './HomeContent.css';
import { Container, Row, Col } from 'react-grid-system';
import {works_config} from '../description/works';
import { setConfiguration } from 'react-grid-system';


export class HomeContent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            height: 0,
            part_height: 0
        }

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
                        <span className="title" dangerouslySetInnerHTML={{ __html: body.name }} ></span>
                        <a href={`/works/${body.slug}`} className="tile-link" style={{backgroundImage: `url("/media/tumbnail_still/${body.thumbnail_still}")`}}>&nbsp;</a>
                    </div>
                </Col>
            );
            // <a href={`/works/${body.slug}`} className="tile-link" style={{backgroundImage: `url("/media/tumbnail_still/${body.thumbnail_still}")`}}>&nbsp;</a>
            return [(
                <Col key={key}  md={12} sm={12} xs={12} >
                    <div className="year">
                        <span className="year_span">
                            {key}
                        </span>
                    </div>
                </Col>
            ),rendered_tiles] ;
        });


        console.log(this.year_sections)

    }

    componentDidMount() {
        const height = this.divElement.clientHeight;
        const part_height = height / 12;
        this.setState({ height });
        this.setState({ part_height });
        console.log(height)
    }

    render(){
        return (
            <div style={{position: 'relative'}}>
                {/*{this.hole_page()}*/}
                {this.render_in_grid(this.hole_page())}
                {this.render_navi()}
            </div>
        );
    }

    render_navi () {
        return (
            <div className="navi_home">
                <Container style={{maxWidth: '100%', paddingLeft:0, paddingRight:0}}>
                    <Row>
                        <Col key="navi_home"  md={12} sm={12} xs={12} >
                            <div className="navi-toggle">
                                <div> lII</div>
                            </div>
                            {/*
                                  <nav>
                                    <ul>
                                      <li>
                                        <Link to="/">Home</Link>
                                      </li>
                                      <li>
                                        <Link to="/about">About</Link>
                                      </li>
                                      <li>
                                        <Link to="/users">Users</Link>
                                      </li>

                                    </ul>
                                  </nav>
                                  */}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    render_in_grid(content) {
        const grid_rows = Array.apply(0, Array(12))
            .map((element, index) => {
                return (
                    <Row>
                        <div className={`overlay_row overlay_row_${index%2===0?"even":"odd"}`} style={{height: this.state.part_height - 1}}>
                            <div style={{marginTop:-(this.state.part_height * index)}}>
                                {content}
                            </div>
                        </div>
                    </Row>
                );
            } );
        console.log(grid_rows)
        return grid_rows

    }

    hole_page() {
        return (
                <div className="content_wrapper"  ref={ (divElement) => { this.divElement = divElement } }>
                    <Container style={{maxWidth: '768px', paddingLeft:0, paddingRight:0}}>
                        <Row>
                            <Col key="qr"  md={12} sm={12} xs={12} >
                                <div className="site_title_wrapper">
                                    <div className="site_title_top">diplom doku</div>
                                    <img className="qr"  src={`media/img/qr.png`} alt="Logo" />
                                    <div className="site_title_bottom">malte-levin behrens</div>
                                </div>
                            </Col>
                            {this.year_sections}
                        </Row>
                    </Container>
                </div>
        );
    }
}