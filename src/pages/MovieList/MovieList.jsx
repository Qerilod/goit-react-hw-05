import React from "react";
import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <div className={s.movieList}>
      {movies.map((movie) => (
        <Link
          key={movie.id}
          to={`/movies/${movie.id}`}
          state={{ from: location }}
          className={s.movieItem}
        >
          <img
            className={s.movieImage}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <p className={s.movieTitle}>{movie.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
