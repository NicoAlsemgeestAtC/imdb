// src/pages/DiscoverMoviesPage.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams, useHistory } from "react-router-dom";

type SearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: ApiResult }
  | { status: "debug"; data: ApiResult }
  | { status: "error"; error: any };

type ApiResult = {
  totalResults: string;
  Response: string;
  Error: string;
  Search: Movie[];
};
type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export default function DiscoverMoviesPage() {
  const [searchText, setSearchText] = useState("");
  const [searchState, setSearchState] = useState<SearchState>({
    status: "idle",
  });
  const routeParams = useParams<{ search: string }>();
  const history = useHistory();

  useEffect(() => {
    if (routeParams.search && routeParams.search.length > 0) {
      setSearchText(routeParams.search);
      search(routeParams.search);
    }
  }, [routeParams.search]);

  const search = async (searchString: string) => {
    setSearchState({ status: "loading" });
    const queryParam = encodeURIComponent(searchString);
    const data = await axios.get<ApiResult>(
      `https://omdbapi.com/?apikey=7b03239a&s=${queryParam}`
    );
    if (data.data.Response === "False") {
      setSearchState({ status: "error", error: data.data.Error });
    } else {
      setSearchState({ status: "success", data: data.data });
    }
  };

  const navigateToSearch = () => {
    const routeParam = encodeURIComponent(searchText);
    history.push(`/discover/${routeParam}`);
  };

  return (
    <div>
      <h1>Discover some movies!</h1>
      <div>
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={() => navigateToSearch()}>Search</button>
        {searchState.status === "loading" && <p>Searching...</p>}
        {searchState.status === "error" && <p>{searchState.error}</p>}
        {searchState.status === "success" && (
          <div>
            <h2>Search results</h2>
            {searchState.data.Search.slice(0, 10).map((movie) => {
              return (
                <NavLink key={movie.imdbID} to={`/Movie/${movie.imdbID}`}>
                  <img alt={movie.Title} src={movie.Poster}></img>
                </NavLink>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
