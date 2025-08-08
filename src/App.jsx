import { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import MovieModal from "./components/MovieModal";

// import { updateSearchCount } from "./appwrite";
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "31f7e97e778ff5050ddee1769327d65f";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setmovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useDebounce(
    () => {
      setDebounceSearchTerm(searchTerm);
    },
    500,
    [searchTerm]
  );

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("fail");
      }
      const data = await response.json();
      console.log(data);
      if (data.response === "False") {
        setErrorMessage(data.Error || "failed to fetch movies");
        setmovieList([]);
        return;
      }
      setmovieList(data.results || []);

      // if (query && data.results.length > 0) {
      //   await updateSearchCount(query, data.results[0]);
      // }
    } catch (error) {
      console.log("Error Fetching" + error);
      setErrorMessage("Error Fetching Movies please ty again later");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm]);
return (
  <>
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies </span>You'll Enjoy
            Without Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>
          {isLoading ? (
            <div className="text-white">
              <Spinner />
            </div>
          ) : errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
  {movieList.map((movie) => (
    <MovieCard
      key={movie.id}
      movie={movie}
      onClick={() => setSelectedMovie(movie)}
    />
  ))}
</div>

          )}
        </section>
      </div>
    </main>

    {selectedMovie && (
      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    )}
  </>
);

};

export default App;
