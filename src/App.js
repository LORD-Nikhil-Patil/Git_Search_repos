import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import "../src/css/app.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Landing from "../src/component/landingPage";
import ReposList from "../src/component/reposList";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/search/:q" element={<ReposList />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
