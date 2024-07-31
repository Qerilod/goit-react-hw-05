import React from "react";
import s from "./MoviesPage.module.css";
const MovieList = ({ movies, onMovieClick }) => {
  return (
    <div className={s.movieList}>
      {movies.map((movie) => (
        <div
          key={movie.id}
          className={s.movieItem}
          onClick={() => onMovieClick(movie.id)}
        >
          <img
            className={s.movieImage}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <p className={s.movieTitle}>{movie.title}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
