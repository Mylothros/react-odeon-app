import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Main.scss';
import MainContent from '../content/main-content/MainContent';
import Spinner from '../spinner/Spinner';
import SearchResult from '../content/search-result/SearchResult';

const Main = (props) => {
    const { searchResult } = props;
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
                loading ? <Spinner /> : 
                <>
                    {searchResult && searchResult.length === 0 ? <MainContent /> : <SearchResult /> }
                </>
            } 
        </div>
    )
}

Main.propTypes = {
    searchResult: PropTypes.array
};

const mapStateToProps = (state) => ({
    searchResult: state.movies.searchResult
});

export default connect(mapStateToProps, {})(Main);