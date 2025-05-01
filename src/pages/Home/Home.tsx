import { useState } from "react";
import { searchMovies } from "../../services/service";
import MovieCard from "../../components/MovieCard/MovieCard";
import styles from "./Home.module.css";
import Button from "../../components/Button/Button";

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
}

interface ApiResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error:string
}

const Home = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data: ApiResponse = await searchMovies(query);
  
      if (data.Response === "True") {
        setResults(data.Search || []);
      } else {
        setResults([]);
        setError(data.Error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className={styles.container}>
      <h1>Welcome to Omega Movies</h1>
      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <Button
          className={styles.button}
          onClick={handleSearch}
          disabled={loading}
          label={loading ? "Searching..." : "Search"}
        ></Button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className={styles.grid}>
        {results.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
