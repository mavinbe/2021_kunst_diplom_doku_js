import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import './App.css';
import {VideoJsPlayer} from "./component/api.video/VideoJsPlayer";
import {HomeContent} from './component/HomeContent'
import {works_config} from './description/works';
import useWindowDimensions from "./helpers/WindowDimensions";

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
        <div className="content">
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            {works.map((entry, i) => (
                <Route key={i} path={`/works/${entry.slug}`}>
                  {/*<Player name={entry.name} api_video_code={entry.api_video_code} windowHeight={height} windowWidth={width}  />
                  */}
                  <VideoJsPlayer slug={entry.slug} current_work_state={current_work_state} api_video_code={entry.api_video_code}   backround_color={entry.background_color} prev_entry={entry.prev_entry} next_entry={entry.next_entry} windowHeight={height} windowWidth={width} />
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
