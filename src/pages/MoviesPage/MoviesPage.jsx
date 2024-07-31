import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import MovieList from "../MovieList/MovieList";
import s from "./MoviesPage.module.css";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

function MoviesPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParam = searchParams.get("query");
    if (queryParam) {
      setQuery(queryParam);
      fetchMovies(queryParam);
    }
  }, [searchParams]);

  const fetchMovies = async (query) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
    const options = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDQ1OWI3YWE1MWI2NmEyNTg2YzhjZmY1OGZkNjdjMiIsIm5iZiI6MTcyMjE4NzkwMC4zNzA3MjQsInN1YiI6IjY2YTUwOGI4ZmVlZDI4ZmUzYjYwMGM3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hKpdCZcJPHFG3IvSt8oeaXj2sjvG2fNHkud8Mlk_j4c",
      },
    };

    try {
      const response = await axios.get(url, options);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error searching for movies:", error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchParams({ query });
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`, {
      state: { from: `/movies?query=${query}` },
    });
  };

  return (
    <div className={s.pageContainer}>
      <div className={s.searchContainer}>
        <form onSubmit={handleSearch} className={s.form}>
          <input
            className={s.input}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie"
          />
          <button className={s.btn} type="submit">
            Search
          </button>
        </form>
      </div>
      <MovieList
        className={buildLinkClass}
        movies={movies}
        onMovieClick={handleMovieClick}
      />
    </div>
  );
}

export default MoviesPage;
