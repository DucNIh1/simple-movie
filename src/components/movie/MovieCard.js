import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import LoadingSkeleton from "../loading/LoadingSkeleton";
const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full p-3 rounded-lg select-none card-movie bg-slate-800">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt=""
        className="w-full object-cover object-center  h-[250px] rounded-lg mb-5"
      />
      <h3 className="mb-3 text-xl font-bold text-white">{movie.title}</h3>
      <div className="flex justify-between mb-10">
        <span className="text-slate-300">
          {new Date(movie.release_date).getFullYear()}
        </span>
        <span className="text-slate-300">{movie.vote_average}</span>
      </div>
      <Button onClick={() => navigate(`/movie/${movie.id}`)}>Watch now</Button>
    </div>
  );
};

export const LoadingMovie = () => {
  return (
    <div className="flex flex-col h-full p-3 rounded-lg card-movie bg-slate-800">
      <LoadingSkeleton
        className={"w-full  h-[250px] rounded-lg mb-5"}
      ></LoadingSkeleton>
      <h3 className="mb-3 text-xl font-bold text-white">
        <LoadingSkeleton className={"w-full h-5"}></LoadingSkeleton>
      </h3>
      <div className="flex justify-between mb-10">
        <span className="text-slate-300">
          <LoadingSkeleton className={"w-[50px] h-[10px]"}></LoadingSkeleton>
        </span>
        <span className="text-slate-300">
          <LoadingSkeleton className={"w-[50px] h-[10px]"}></LoadingSkeleton>
        </span>
      </div>
      <LoadingSkeleton
        className={"px-5 py-4 mt-auto rounded-lg"}
      ></LoadingSkeleton>
    </div>
  );
};
export default MovieCard;
