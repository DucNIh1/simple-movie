import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import MovieCard, { LoadingMovie } from "./MovieCard";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";

//https://api.themoviedb.org/3/movies/now_playing?api_key=%3C%3Capi_key%3E%3E
const MovieList = ({ type = "now_playing" }) => {
  const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  const movies = data?.results || [];
  const isLoading = !data && !error;
  // console.log(movies);
  console.log(data);
  return (
    <div className="movie-list">
      {isLoading &&
        movies.map((movie) => (
          <Swiper
            grabCursor={true}
            spaceBetween={40}
            slidesPerView={"auto"}
            direction="horizontal"
          >
            {movies.length > 0 &&
              !isLoading &&
              movies.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <LoadingMovie></LoadingMovie>
                </SwiperSlide>
              ))}
          </Swiper>
        ))}
      {!isLoading && (
        <Swiper
          grabCursor={true}
          spaceBetween={40}
          slidesPerView={"auto"}
          direction="horizontal"
        >
          {movies.length > 0 &&
            !isLoading &&
            movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard movie={movie}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

export default MovieList;
