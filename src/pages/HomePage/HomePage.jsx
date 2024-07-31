import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieList from "../MovieList/MovieList";
import s from "./HomePage.module.css";
import { useNavigate, useLocation } from "react-router-dom";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const url = "https://api.themoviedb.org/3/trending/movie/day";
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
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`, { state: { from: location } });
  };

  return <MovieList movies={movies} onMovieClick={handleMovieClick} />;
};

export default HomePage;
