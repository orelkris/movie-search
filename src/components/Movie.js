import React from 'react';

export default function Movie({ title, poster, overview, rating, date }) {
  const year = new Date(date).getFullYear();
  return (
    <div className="movie__container">
      <h2 className="movie__title">
        {title} ({year})
      </h2>
      <p className="movie__rating">Rating: {rating}</p>
      <div className="movie__content">
        {poster && (
          <img
            className="movie__image"
            src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${poster}`}
            alt=""
          />
        )}
        <p>{overview}</p>
      </div>
    </div>
  );
}
