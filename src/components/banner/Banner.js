import React from "react";
import useSWR from "swr";
import { fetcher } from "../../config";
import { SwiperSlide, Swiper } from "swiper/react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=55bec2ebb648903e081e812edc3f381a&query=''`,
    fetcher
  );
  const movies = data?.results || [];
  console.log(movies);
  return (
    <section className="banner bg-white h-[400px] page-container rounded-lg mb-20 overflow-hidden">
      <Swiper grabCursor="true" slidesPerView={"auto"} spaceBetween={40}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

const BannerItem = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-full rounded-lg">
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
        className="object-cover object-center w-full h-full rounded-lg"
        alt=""
      />
      <div className="absolute left-5 bottom-5">
        <p className="mb-5 text-3xl font-bold text-white">{item.title}</p>
        <div className="flex items-center mb-10 gap-x-3">
          <div className="px-2 py-1 text-xl text-white border border-white rounded-lg">
            Action
          </div>
          <div className="px-2 py-1 text-xl text-white border border-white rounded-lg">
            Adventure
          </div>
          <div className="px-2 py-1 text-xl text-white border border-white rounded-lg">
            Drama
          </div>
        </div>
        <Button
          onClick={() => navigate(`./movie/${item.id}`)}
          className="px-6 py-3 mt-10 text-2xl "
        >
          {" "}
          Watch now
        </Button>
      </div>
    </div>
  );
};
export default Banner;
