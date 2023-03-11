import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';

import "./App.scss";
import Header from "./component/header/Header"
import Main from "./component/main/Main"
import { loadMoreMovies, setResponsePageNumber } from './redux/actions/movies';
import Details from './component/content/details/Details';

function App(props) {
  const { loadMoreMovies, page, totalPages, movieType } = props;
  const [currentPage, setCurrentPage] = useState(page);

  const mainRef = useRef();
  const bottomLineRef = useRef();

  const fetchData = () => {
      let pageNumber = currentPage;
      if (page < totalPages){
          pageNumber +=1;
          setCurrentPage(pageNumber);
          loadMoreMovies(movieType, pageNumber);
      }
  };

  useEffect (() => {
    setResponsePageNumber(currentPage, totalPages);
  }, [currentPage, totalPages]);

  const handleScroll = () => {
    const containerHeight = mainRef.current.getBoundingClientRect().height;
    const { top: bottomLineTop } =  bottomLineRef.current.getBoundingClientRect();
    if (bottomLineTop <= containerHeight) {
        fetchData();
    };
  };

  return (
    <Router>
      <div className="main" ref={mainRef} onScroll={() => handleScroll()}>
        <Header />
        <div className="app">
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route exact path="/:id/:name/details" element={<Details/>}/>
          </Routes>
        </div>
        <div ref={bottomLineRef}></div>
      </div>
    </Router>
  );
}

Main.propTypes = {
  page: PropTypes.number,
  totalPages: PropTypes.number,
  loadMoreMovies: PropTypes.func,
  movieType: PropTypes.string
};

const mapStateToProps = (state) => ({
  page: state.movies.page,
  totalPages: state.movies.totalPages,
  movieType: state.movies.movieType
});

export default connect(mapStateToProps, { loadMoreMovies, setResponsePageNumber })(App);
