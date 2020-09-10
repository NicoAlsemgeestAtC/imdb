import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import AboutPage from "./Pages/AboutPage";
import HomePage from "./Pages/HomePage";
import DiscoverMoviesPage from "./Pages/DiscoverMoviesPage";
import NavBar from "./Components/NavBar";
import MoviePage from "./Pages/MoviePage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/movie/:imdbID" component={MoviePage} />
        <Route path="/discover/:search?" component={DiscoverMoviesPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
