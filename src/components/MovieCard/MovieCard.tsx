import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie }: { movie: any }) => {
  return (
    <div className={styles.card}>
      <img className={styles.poster} src={movie.Poster} alt={movie.Title} />
      <div className={styles.content}>
        <h3 className={styles.title}>{movie.Title}</h3>
        <p className={styles.year}>{movie.Year}</p>
        <Link to={`/movie/${movie.imdbID}`}>
        <Button className={styles.button} label='More Info'></Button>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
