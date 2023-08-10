import React, { Fragment } from "react";
import MovieList from "../components/movie/MovieList";

const HomePage = () => {
  return (
    <Fragment>
      {/* Now playing*/}
      <section className="mb-20 page-container">
        <h2 className="mb-10 text-3xl font-semibold text-white">Now Playing</h2>
        <MovieList></MovieList>
      </section>
      {/* Top rated movies */}
      <section className="mb-20 page-container">
        <h2 className="mb-10 text-3xl font-semibold text-white">
          Top rated movies
        </h2>
        <MovieList type={"top_rated"}></MovieList>
      </section>
      {/* Now playing*/}
      <section className="mb-20 page-container">
        <h2 className="mb-10 text-3xl font-semibold text-white">Trending</h2>
        <MovieList type={"popular"}></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
