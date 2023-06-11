import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataAPI } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getAPIconfiguration, getGenres } from "./redux/homeSlice.js";

import { Home, Details, Explore, PageNotFound, SearchResult } from "./pages";
import { Header, Footer } from "./components";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => {
    return state.home;
  });

  useEffect(() => {
    fetchData();
    genresCall();
  }, []);

  const fetchData = () => {
    fetchDataAPI("/configuration").then((res) => {
      // console.log(res);
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getAPIconfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endpoints = ["tv", "movie"];
    let allGenres = {};
    endpoints.forEach((url) => {
      promises.push(fetchDataAPI(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => {
        allGenres[item.id] = item;
      });
    });

    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
