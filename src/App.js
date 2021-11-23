import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

import {Player} from './component/api.video/Player'
import {VideoJsPlayer} from "./component/api.video/VideoJsPlayer";
import {HomeContent} from './component/HomeContent'


import {works_config} from './description/works';
import useWindowDimensions from "./helpers/WindowDimensions";


export default function App() {
  const { height, width } = useWindowDimensions();
  return (
      <Router>
        <div className="content">
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            {works_config.map((entry, i) => (
                <Route key={i} path={`/works/${entry.slag}`}>
                  {/*<Player name={entry.name} api_video_code={entry.api_video_code} windowHeight={height} windowWidth={width}  />
                  */}
                  <VideoJsPlayer/>
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
        </div>
        {/*
        <div className="navi">
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
        </div>
        */}
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
