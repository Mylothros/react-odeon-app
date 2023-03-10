import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Main.scss';
import MainContent from '../content/main-content/MainContent';
import Spinner from '../spinner/Spinner';
import { loadMoreMovies, setResponsePageNumber } from '../../redux/actions/movies';

const Main = (props) => {
    
    const [loading, setLoading] = useState(false);
    

    

    useEffect (() => {
        setLoading(true);
        setTimeout(()=> {
            setLoading(false);
        }, 3000);
    }, []);

    

    

    

    return (
        <div>
            {
                loading ? <Spinner /> : <MainContent />
            } 
            
        </div>
    )
}

Main.propTypes = {
    list: PropTypes.array,
    page: PropTypes.number,
    totalPages: PropTypes.number,
    loadMoreMovies: PropTypes.func,
    setResponsePageNumber: PropTypes.func,
    movieType: PropTypes.string
};

const mapStateToProps = (state) => ({
    list: state.movies.list,
    page: state.movies.page,
    totalPages: state.movies.totalPages,
    movieType: state.movies.movieType
});

export default connect(mapStateToProps, { loadMoreMovies, setResponsePageNumber })(Main);