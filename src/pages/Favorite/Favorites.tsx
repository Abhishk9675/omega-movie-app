import { useEffect, useState } from 'react';
import styles from './Favorites.module.css';
import Button from '../../components/Button/Button';

const Favorites = () => {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(favs);
  }, []);

  const removeFavorite = (id: string) => {
    const updated = favorites.filter(f => f.imdbID !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className={styles.container}>
      <h2>Your Favorite Movies</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        favorites.map(fav => (
          <div className={styles.favoriteCard} key={fav.imdbID}>
            <img className={styles.poster} src={fav.Poster} alt={fav.Title} />
            <div className={styles.details}>
              <h3>{fav.Title}</h3>
              <p><strong>Year:</strong> {fav.Year}</p>
            </div>
            <Button
            label='Remove'
              className={styles.removeBtn}
              onClick={() => removeFavorite(fav.imdbID)}
            >
            </Button>
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;
