// src/pages/DiscoverMoviesPage.tsx
import React, { useState } from "react";
import axios from "axios";

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

  const search = async () => {
    setSearchState({ status: "loading" });
    const queryParam = encodeURIComponent(searchText);
    const data = await axios.get<ApiResult>(
      `https://omdbapi.com/?apikey=7b03239a&s=${queryParam}`
    );
    if (data.data.Response === "False") {
      setSearchState({ status: "error", error: data.data.Error });
    } else {
      setSearchState({ status: "success", data: data.data });
    }
  };

  return (
    <div>
      <h1>Discover some movies!</h1>
      <div>
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={search}>Search</button>
        {searchState.status === "loading" && <p>Searching...</p>}
        {searchState.status === "error" && <p>{searchState.error}</p>}
        {searchState.status === "success" && (
          <div>
            <h2>Search results</h2>
            {searchState.data.Search.slice(0, 10).map((movie) => {
              return (
                <div key={movie.imdbID}>
                  {movie.Title} ({movie.Year})
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
