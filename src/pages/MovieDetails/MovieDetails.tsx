import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../../services/service";
import Button from "../../components/Button/Button";
import styles from "./MovieDetails.module.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getMovieDetails(id).then(setMovie);
    }
  }, [id]);

  if (!movie) return <div className={styles.container}>Loading...</div>;
  const addToFavorites = () => {
    setloading(true);
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    const exists = favs.some((fav: any) => fav.imdbID === movie.imdbID);
    setTimeout(() => {
      if (!exists) {
        favs.push(movie);
        localStorage.setItem("favorites", JSON.stringify(favs));
      }
      setloading(false);
      navigate("/favorites");
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <h2>{movie.Title}</h2>
      <img className={styles.poster} src={movie.Poster} alt={movie.Title} />
      <div className={styles.details}>
        <p>
          <strong>Genre:</strong> {movie.Genre}
        </p>
        <p>
          <strong>Director:</strong> {movie.Director}
        </p>
        <p>
          <strong>Plot:</strong> {movie.Plot}
        </p>
        <p>
          <strong>Ratings:</strong> {movie.imdbRating}
        </p>
      </div>
      <Button
        className={styles.button}
        label={loading ? "Adding..." : "Add to Favorites"}
        disabled={loading}
        onClick={addToFavorites}
      />
    </div>
  );
};

export default MovieDetails;
