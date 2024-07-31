import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`;
      const options = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDQ1OWI3YWE1MWI2NmEyNTg2YzhjZmY1OGZkNjdjMiIsIm5iZiI6MTcyMjE4NzkwMC4zNzA3MjQsInN1YiI6IjY2YTUwOGI4ZmVlZDI4ZmUzYjYwMGM3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hKpdCZcJPHFG3IvSt8oeaXj2sjvG2fNHkud8Mlk_j4c",
        },
      };

      try {
        const response = await axios.get(url, options);
        setReviews(response.data.results);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (reviews.length === 0) {
    return <h1>Sorry, no comments found, but yours could be the first!</h1>;
  }

  return (
    <div className={s.container}>
      <h2 className={s.title}>Reviews</h2>
      <ul className={s.list}>
        {reviews.map((review) => (
          <li className={s.listItem} key={review.id}>
            <h3 className={s.author}>{review.author}</h3>
            <p className={s.content}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
