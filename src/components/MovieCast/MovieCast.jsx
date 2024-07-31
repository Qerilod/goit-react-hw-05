import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
      const options = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDQ1OWI3YWE1MWI2NmEyNTg2YzhjZmY1OGZkNjdjMiIsIm5iZiI6MTcyMjE4NzkwMC4zNzA3MjQsInN1YiI6IjY2YTUwOGI4ZmVlZDI4ZmUzYjYwMGM3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hKpdCZcJPHFG3IvSt8oeaXj2sjvG2fNHkud8Mlk_j4c",
        },
      };

      try {
        const response = await axios.get(url, options);
        setCast(response.data.cast);
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div className={s.container}>
      <h2 className={s.title}>Cast</h2>
      <ul className={s.list}>
        {cast.map((actor) => (
          <li className={s.listItem} key={actor.cast_id}>
            {actor.profile_path ? (
              <img
                className={s.img}
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                style={{ width: 200, height: 250, objectFit: "cover" }}
              />
            ) : (
              <img
                className={s.noImg}
                src="https://via.placeholder.com/100x150?text=No+Image"
                alt="No Image"
                style={{ width: 200, height: 250, objectFit: "cover" }}
              />
            )}
            <div className={s.info}>
              {actor.name} as {actor.character}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
