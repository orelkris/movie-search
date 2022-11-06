import React, { useState, useEffect, useRef } from 'react';
import Movie from './Movie';

export default function SearchMovies(props) {
  const [formData, setFormData] = useState({
    query: '',
  });
  const [movies, setMovies] = useState([]);
  let movieElements = [];

  const searchInput = useRef(null);

  useEffect(() => {
    searchInput.current.focus();
  }, []);

  useEffect(() => {
    searchInput.current.value = '';
    searchInput.current.focus();
  }, [movies]);

  const handleQuery = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const searchMovies = async (event) => {
    event.preventDefault();
    const url = `https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&query=${formData.query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      const sortedData = data.results.sort((a, b) =>
        a.vote_average < b.vote_average ? 1 : -1
      );
      setMovies(sortedData);
      console.log(sortedData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="movie-search__container">
      <form onSubmit={searchMovies} className="movie-search__form">
        <label htmlFor="query" className="movie-search__label">
          Movie Name:
        </label>
        <input
          ref={searchInput}
          type="text"
          className="movie-search__query"
          placeholder="i.e. Midnight Run"
          id="query"
          name="query"
          value={formData.query}
          onChange={handleQuery}
          autoComplete="off"
        />
        <button className="movie-search__submit">Find Movie</button>
      </form>
      <div>
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            title={movie['original_title']}
            date={movie['release_date']}
            overview={movie.overview}
            poster={movie['poster_path']}
            rating={movie['vote_average']}
          />
        ))}
      </div>
    </div>
  );
}
