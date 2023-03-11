import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate, useLocation, useMatch } from 'react-router-dom';

import './Header.scss';
import { getMovies, setMovieType, setResponsePageNumber, searchQuery, searchResult, clearMovieDetails } from '../../redux/actions/movies';

const Header_List = [
    {
        id: 1,
        iconClass: "fas fa-film",
        name: "Now Playing",
        type: "now_playing"
    },
    {
        id: 2,
        iconClass: "fas fa-fire",
        name: "Popular",
        type: "popular"
    },
    {
        id: 3,
        iconClass: "fas fa-star",
        name: "Top Rated",
        type: "top_rated"
    },
    {
        id: 4,
        iconClass: "fas fa-plus-square",
        name: "Upcoming",
        type: "upcoming"
    }
];

const Header = (props) => {
    const { getMovies, setMovieType, page, totalPages, searchQuery, searchResult, clearMovieDetails } = props;
    let [menuClass, setMenuClass] = useState(false);
    const [type, setType] = useState('now_playing');
    const [search, setSearch] = useState('');
    const [disableSearch, setDisableSearch] = useState(false);
    const [closeMenuHeader, setCloseMenuHeader] = useState("");
    const [hideHeader, setHideHeader] = useState(false);

    const history = useNavigate();
    const location = useLocation();
    const detailsRoute = useMatch('/:id/:name/details');
    
    useEffect(() => {
        getMovies(type, 1);
        setResponsePageNumber(page, totalPages);

        if (detailsRoute || location.pathname === '/') {
            setHideHeader(true);
        }

        if(location.pathname !=='/' && location.key) {
            setDisableSearch(true);
        }
    }, [type, disableSearch, location]);

    const setMovieTypeUrl = (type) => {
        searchResult([]);
        searchQuery('');
        setSearch('');
        setDisableSearch(false);
        setCloseMenuHeader("");
        if(location.pathname !== '/') {
            clearMovieDetails();
            history('/');
            setType(type);
            setMovieType(type);
        }
        else {
            setType(type);
            setMovieType(type);
            getMovies(type, 1);
            setResponsePageNumber(page, totalPages);
        }
    };

    const toggleMenu = () => {     
        menuClass = !menuClass;  
        if (closeMenuHeader === "") {
            setCloseMenuHeader("header-mobile-nav");
        }
        else {
            setCloseMenuHeader("");
        }
    };

    const onSearchChange = (e) => {
        setCloseMenuHeader("");
        setSearch(e.target.value);
        searchQuery(e.target.value);
        searchResult(e.target.value);
    };

    const navigateToHome = () => {
        searchResult([]);
        searchQuery('');
        setSearch('');
        setDisableSearch(false);
        clearMovieDetails();
        history('/');
    };

    return (
        <>
            {
                hideHeader && (
            
                <div className="header-nav-wrapper">
                    <div className="header-bar"></div>
                    <div className="header-navbar">
                        <div className="header-image" onClick={navigateToHome}>
                            <h1>Odeon</h1>
                        </div>
                        <input 
                            className={`search-input ${disableSearch ? 'disabled' : ''}`}
                            type="text" 
                            placeholder="Search"
                            value={search}
                            onChange={onSearchChange}
                        />
                        <div 
                            className={`${menuClass ? 'header-menu-toggle is-active' : 'header-menu-toggle'}`} 
                            id="header-mobile-menu"
                            onClick={() => toggleMenu()}
                        >
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </div>
                        <ul className={`header-nav ${closeMenuHeader} header-nav`}>
                            {
                                Header_List.map((data) => 
                                    <li key={data.id} onClick={() => setMovieTypeUrl(data.type)}
                                    className={data.type === type ? 'header-nav-item active-item' : 'header-nav-item'}>
                                        <span className="header-list-name">
                                            <i className={data.iconClass}></i>
                                        </span>
                                        &nbsp;
                                        <span className="header-list-name">{data.name}
                                        </span>
                                    </li>
                                )
                            } 
                            
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}

Header.propTypes = {
    getMovies: PropTypes.func,
    setMovieType: PropTypes.func,
    list: PropTypes.array,
    page: PropTypes.number,
    totalPages: PropTypes.number,
    searchQuery: PropTypes.func,
    searchResult: PropTypes.func,
    clearMovieDetails: PropTypes.func
};

const mapStateToProps = (state) => ({
    list: state.movies.list,
    page: state.movies.page,
    totalPages: state.movies.totalPages
});

export default connect(mapStateToProps, { getMovies, setMovieType, searchQuery, searchResult, clearMovieDetails })(Header);