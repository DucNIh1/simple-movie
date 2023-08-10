import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../config";
import MovieCard from "../components/movie/MovieCard";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";

const itemsPerPage = 20; // số phim trên mỗi trang là 20 bộ
const MoviesPage = () => {
  const [filter, setFilter] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const filterDebounce = useDebounce(filter, 500);
  // set url để mỗi lần data thay đổi render đúng ý
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=95f2419536f533cdaa1dadf83c606027&page=${currentPage}`
  );

  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=95f2419536f533cdaa1dadf83c606027&query=${filterDebounce}&page=${currentPage}`
      );
    } else
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=95f2419536f533cdaa1dadf83c606027&page=${currentPage}`
      );
  }, [currentPage, filterDebounce]);
  const { data, error } = useSWR(url, fetcher);

  const movies = data?.results || [];
  console.log(data);
  // Phân trang

  // Khởi tạo số trang
  const [pageCount, setPageCount] = useState(0);

  // khởi tạo offset
  // const [itemOffset, setItemOffset] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setCurrentPage(event.selected + 1);
  };
  const loading = !data && !error;

  if (!data) return null;

  return (
    <>
      <div className="flex w-[60%] mx-auto">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-2 text-xl text-white rounded-sm outline-none bg-slate-800"
            placeholder="Tìm tên phim, diễn viên...."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <button className="p-2 ml-5 rounded-lg bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 font-bold text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {/* loading */}
      {loading && (
        <div className="border-4 border-t-transparent  border-blue-400 rounded-full  w-[50px] h-[50px] mx-auto mt-20 loading animate-spin"></div>
      )}
      {!loading && data && (
        <div className="grid grid-cols-4 gap-10 px-20 py-10">
          {movies.length > 0 &&
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie}></MovieCard>
            ))}
        </div>
      )}
      {
        <div className="mb-10 text-lg font-semibold text-white ">
          <ReactPaginate
            className="flex justify-center font-semibold text-white gap-x-4"
            breakLabel="..."
            nextLabel=<svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            previousLabel=<svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          />
        </div>
      }
    </>
  );
};

export default MoviesPage;
