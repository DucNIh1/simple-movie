import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "./MovieCard";

const MovieDetailPage = () => {
  const id = useParams();
  const movieId = id.movieID;
  const { data } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);

  return (
    <Fragment>
      {data && (
        <>
          <div className="w-full h-[700px] text-white relative mb-10">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div
              className="w-full h-full bg-center bg-no-repeat bg-cover"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
              }}
            ></div>
          </div>
          <div className="w-full max-w-[800px] h-[400px] relative mt-[-20%] left-[50%] translate-x-[-50%] ">
            <img
              className="object-cover object-center w-full h-full rounded-xl"
              src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
              alt=""
            />
          </div>
          <h1 className="mt-10 mb-10 text-3xl font-bold text-center text-white">
            {data.title}
          </h1>
          {data.genres.length > 0 && (
            <div className="flex items-center justify-center mb-10 gap-x-5">
              {data.genres.map((item) => (
                <div
                  key={item.id}
                  className="px-5 py-1 border text-primary rounded-2xl border-primary"
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
          <p className="text-lg text-center text-white max-w-[600px] mx-auto leading-relaxed mb-10">
            {data.overview}
          </p>

          <h1 className="mt-10 mb-10 text-3xl font-bold text-center text-blue-800 m">
            Casts
          </h1>
          <MovieCredits></MovieCredits>
          <VideoCard></VideoCard>
          <SimilarMovies></SimilarMovies>
        </>
      )}
    </Fragment>
  );
};
// Danh sach dien vien
function MovieCredits() {
  const id = useParams();
  const movieId = id.movieID;
  const { data } = useSWR(tmdbAPI.getMovieCredits(movieId), fetcher);
  console.log(data);
  if (!data) return null;
  return (
    <div className="w-full mb-10 px-[110px] cast">
      <Swiper
        grabCursor={true}
        spaceBetween={20}
        slidesPerView={"auto"}
        direction="horizontal"
      >
        {data.cast.length > 0 &&
          data.cast.map((item, index) => (
            <>
              <SwiperSlide key={index}>
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                    alt=""
                  />
                </div>
                <h3 className="absolute text-white">{item.name}</h3>
              </SwiperSlide>
            </>
          ))}
      </Swiper>
    </div>
  );
}
function VideoCard() {
  const id = useParams();
  const movieId = id.movieID;
  const { data } = useSWR(tmdbAPI.getVideoCard(movieId), fetcher);
  console.log(data);
  if (!data) return null;
  return (
    <>
      {data.results.length > 0 &&
        data.results.slice(0, 1).map((item) => (
          <div className="">
            <iframe
              className="w-[1200px] h-[600px] mx-auto rounded-lg"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${item.key}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        ))}
    </>
  );
}
const SimilarMovies = () => {
  const id = useParams();
  const movieId = id.movieID;
  const { data } = useSWR(tmdbAPI.getSimilarMovies(movieId), fetcher);
  console.log(data);
  if (!data) return null;
  return (
    <div className="px-10 mt-20 movie-list">
      <h1 className="mb-10 text-3xl font-bold text-white">Similar movies</h1>
      <Swiper
        grabCursor={true}
        spaceBetween={40}
        slidesPerView={"auto"}
        direction="horizontal"
      >
        {data.results.length > 0 &&
          data.results.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
export default MovieDetailPage;
