import React, {useState} from "react";
import {
  BrowserRouter as Router, Link,
  Route,
  Switch
} from "react-router-dom";

import './App.css';
import {VideoJsPlayer} from "./component/api.video/VideoJsPlayer";
import {HomeContent} from './component/HomeContent'
import {works_config} from './description/works';
import useWindowDimensions from "./helpers/WindowDimensions";
import {Media} from "./component/Media";
import {Col, Container, Row} from "react-grid-system";

export default function App() {
  const { height, width } = useWindowDimensions();


  const works = works_config.map((entry, i) => {
    const len = works_config.length;
    //entry.url_to_prev_entry = `/works/${works_config[(i+len-1)%len].slug}`
    entry.prev_entry = works_config[(i+len-1)%len].slug
    entry.next_entry = works_config[(i+1)%len].slug
    return entry;
  });

  const [currentWork, setCurrentWork] = useState(null)
  const current_work_state = {value:currentWork, set:setCurrentWork};

  return (
      <Router>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            {works.map((entry, i) => (
                <Route key={i} path={`/works/${entry.slug}`}>
                  <Media work={entry} current_work_state={current_work_state} windowHeight={height} windowWidth={width}   />
                </Route>
            ))}
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        <div className="navi">
          <Container>
            <Row>
              <Col key="navi"  md={12} sm={12} xs={12} >
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

      </Router>
  );
}

function Home() {
  return <HomeContent />;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
