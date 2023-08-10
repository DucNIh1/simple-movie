import { Fragment, lazy, Suspense } from "react";

import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import Banner from "./components/banner/Banner";
import Login from "./page/Login";
// lazy import
// Dung lazy import giúp mỗi lần vô nó sẽ chỉ load trang đó
const HomePage = lazy(() => import("./page/HomePage"));
const MovieDetailPage = lazy(() =>
  import("./components/movie/MovieDetailPage")
);
const MoviesPage = lazy(() => import("./page/MoviesPage"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route path="/movies" element={<MoviesPage></MoviesPage>}></Route>
            <Route
              path="/movie/:movieID"
              element={<MovieDetailPage></MovieDetailPage>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
