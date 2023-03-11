import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Main.scss';
import MainContent from '../content/main-content/MainContent';
import Spinner from '../spinner/Spinner';
import SearchResult from '../content/search-result/SearchResult';
import { runSpinner, clearMovieDetails } from '../../redux/actions/movies';

const Main = (props) => {
    const { searchResult, runSpinnerValue, runSpinner, clearMovieDetails } = props;
    const [loading, setLoading] = useState(false);

    useEffect (() => {
        if (runSpinnerValue === 1){
            setLoading(true);
            setTimeout(()=> {
                setLoading(false);
                // runSpinner(0); we could run this if we did not have route now it is not necessary
            }, 3000);   
        }
        clearMovieDetails();
    }, []);

    return (
        <div>
            {
                loading ? <Spinner /> : 
                <>
                    {searchResult && searchResult.length === 0 ? <MainContent /> : <SearchResult /> }
                </>
            } 
        </div>
    )
}

Main.propTypes = {
    searchResult: PropTypes.array,
    runSpinnerValue: PropTypes.number
};

const mapStateToProps = (state) => ({
    searchResult: state.movies.searchResult,
    runSpinnerValue: state.movies.runSpinnerValue
});

export default connect(mapStateToProps, {runSpinner, clearMovieDetails})(Main);