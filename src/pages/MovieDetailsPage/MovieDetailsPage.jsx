import React, { useEffect, useState } from "react";
import {
  useParams,
  Outlet,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import s from "./MovieDetailsPage.module.css";
import axios from "axios";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
      const options = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDQ1OWI3YWE1MWI2NmEyNTg2YzhjZmY1OGZkNjdjMiIsIm5iZiI6MTcyMjE4NzkwMC4zNzA3MjQsInN1YiI6IjY2YTUwOGI4ZmVlZDI4ZmUzYjYwMGM3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hKpdCZcJPHFG3IvSt8oeaXj2sjvG2fNHkud8Mlk_j4c",
        },
      };

      try {
        const response = await axios.get(url, options);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const goBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate(-1); // go back to the previous page
    }
  };

  return (
    <div className={s.container}>
      <button onClick={goBack} className={s.goBackButton}>
        Go Back
      </button>
      <div className={s.movieContainer}>
        <div className={s.imgContainer}>
          <img
            className={s.img}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className={s.infoContainer}>
          <h1 className={s.title}>{movie.title}</h1>
          <div className={s.genresContainer}>
            <h3 className={s.titleGenres}>Genres:</h3>
            <ul className={s.genresList}>
              {movie.genres.map((genre) => (
                <li className={s.listItem} key={genre.id}>
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>
          <p className={s.text}>{movie.overview}</p>
          <div className={s.info}>
            <NavLink
              className={buildLinkClass}
              to="cast"
              state={location.state}
            >
              Cast
            </NavLink>
            <NavLink
              className={buildLinkClass}
              to="reviews"
              state={location.state}
            >
              Reviews
            </NavLink>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
