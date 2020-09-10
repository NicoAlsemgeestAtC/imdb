import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// ...
type MovieData = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

type Rating = {
  Source: string;
  Value: string;
};

export default function MoviePage() {
  const routeParams = useParams<{ imdbID: string }>();
  console.log(routeParams);

  const [movieData, setMovieData] = useState<MovieData>();

  useEffect(() => {
    async function fetchData() {
      const queryParam = encodeURIComponent(routeParams.imdbID);
      const data = await axios.get(
        `https://omdbapi.com/?apikey=7b03239a&i=${queryParam}`
      );
      // ...
      console.log("data", data);
      setMovieData(data.data);
    }
    fetchData();
  }, [routeParams.imdbID]);

  return (
    <div>
      {movieData ? (
        <div>
          <h2> {movieData.Title}</h2>
          <div>
            <h1>{movieData.Title}</h1>
            <p>{movieData.Genre}</p>
            <div style={{ display: "flex" }}>
              <img src={movieData.Poster} alt={movieData.Title} />
              <div style={{ marginLeft: "20px" }}>
                <dl>
                  <dt>Director</dt>
                  <dd>{movieData.Director}</dd>
                </dl>
                <dl>
                  <dt>Language</dt>
                  <dd>{movieData.Language}</dd>
                </dl>
                <dl>
                  <dt>Plot</dt>
                  <dd>{movieData.Plot}</dd>
                </dl>
                <dl>
                  <dt>IMDB Rating</dt>
                  <dd>{movieData.imdbRating}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
