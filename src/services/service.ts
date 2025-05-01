const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

console.log("api key",API_KEY);


export const searchMovies = async (query: string) => {
  if (!API_KEY) {
    throw new Error("API key is missing.");
  }

  const response = await fetch(`${BASE_URL}?s=${query}&apikey=${API_KEY}`);
  return response.json();
};

export const getMovieDetails = async (id: string) => {
  if (!API_KEY) {
    throw new Error("API key is missing.");
  }

  const response = await fetch(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
  return response.json();
};
