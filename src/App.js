import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import {
  CacheRoute,
  CacheSwitch
} from "react-router-cache-route";

import './App.css';
import {VideoJsPlayer} from "./component/api.video/VideoJsPlayer";
import {HomeContent} from './component/HomeContent'
import {works_config} from './description/works';
import useWindowDimensions from "./helpers/WindowDimensions";

export default function App() {
  const { height, width } = useWindowDimensions();
  const videoJsOptions = {
    muted: true,
    autoplay: true,
    controls: false,
    fluid: true,
    loop: true

  }



  const works = works_config.map((entry, i) => {
    const len = works_config.length;
    //entry.url_to_prev_entry = `/works/${works_config[(i+len-1)%len].slag}`
    entry.prev_entry = works_config[(i+len-1)%len].slag
    entry.next_entry = works_config[(i+1)%len].slag
    return entry;
  });

  const [currentWork, setCurrentWork] = useState(null)
  const current_work_state = {value:currentWork, set:setCurrentWork};

  return (
      <Router>
        <div className="content">
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <CacheSwitch>
            {works.map((entry, i) => (
                <CacheRoute key={i} path={`/works/${entry.slag}`}>
                  {/*<Player name={entry.name} api_video_code={entry.api_video_code} windowHeight={height} windowWidth={width}  />
                  */}
                  <VideoJsPlayer slug={entry.slag} current_work_state={current_work_state} videoJsOptions={{ ...videoJsOptions, sources: [{src: `https://cdn.api.video/vod/${entry.api_video_code}/hls/manifest.m3u8`}] }}   backround_color={entry.background_color} prev_entry={entry.prev_entry} next_entry={entry.next_entry} windowHeight={height} windowWidth={width} />
                </CacheRoute>
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
          </CacheSwitch>
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
