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
import {useSwipeable} from "react-swipeable";


export default function App() {
  const { height, width } = useWindowDimensions();
  const videoJsOptions = {
    muted: true,
    autoplay: true,
    controls: false,
    fluid: true,


  }



  const works = works_config.map((entry, i) => {
    const len = works_config.length;
    entry.url_to_prev_entry = `/works/${works_config[(i+len-1)%len].slag}`
    entry.url_to_next_entry = `/works/${works_config[(i+1)%len].slag}`
    return entry;
  });
  return (
      <Router>
        <div className="content">
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            {works.map((entry, i) => (
                <Route key={i} path={`/works/${entry.slag}`}>
                  {/*<Player name={entry.name} api_video_code={entry.api_video_code} windowHeight={height} windowWidth={width}  />
                  */}
                  <VideoJsPlayer { ...videoJsOptions } api_video_code={entry.api_video_code}  backround_color={entry.background_color} url_to_prev_entry={entry.url_to_prev_entry} url_to_next_entry={entry.url_to_next_entry} />
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
