import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import logo from '../../assets/odeon-logo.svg';
import './Header.scss';
import { getMovies, setMovieType, setResponsePageNumber, loadMoreMovies } from '../../redux/actions/movies';

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
    const { getMovies, setMovieType, page, totalPages, loadMoreMovies } = props;
    let [navClass, setNavClass] = useState(false);
    let [menuClass, setMenuClass] = useState(false);
    const [type, setType] = useState('now_playing')
    
    useEffect(() => {
        getMovies(type, 1);
        setResponsePageNumber(page, totalPages);
    }, [type]);

    const setMovieTypeUrl = (type) => {
        setType(type);
        setMovieType(type);
        getMovies(type, 1);
        setResponsePageNumber(page, totalPages);
    };

    const toggleMenu = () => {
        menuClass = !menuClass;
        navClass = !navClass;
        setNavClass(navClass);
        setMenuClass(menuClass);
        if (navClass) {
            document.body.classList.add('header-nav-open')
        }
        else {
            document.body.classList.remove('header-nav-open')
        }

    };

    return (
        <>
            <div className="header-nav-wrapper">
                <div className="header-bar"></div>
                <div className="header-navbar">
                    <div className="header-image">
                        <img src={logo} alt="" />
                    </div>
                    <div 
                        className={`${menuClass ? 'header-menu-toggle is-active' : 'header-menu-toggle'}`} 
                        id="hedaer-mobile-menu"
                        onClick={() => toggleMenu()}
                    >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                    <ul className={`${navClass ? 'header-nav header-mobile-nav' : 'header-nav'}`}>
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
                        <input 
                        className="search-input" 
                        type="text" 
                        placeholder="Search for a movie"
                        />
                    </ul> 
                </div>
            </div>
        </>
    )
}

Header.propTypes = {
    getMovies: PropTypes.func,
    setMovieType: PropTypes.func,
    list: PropTypes.array,
    page: PropTypes.number,
    totalPages: PropTypes.number
};

const mapStateToProps = (state) => ({
    list: state.movies.list,
    page: state.movies.page,
    totalPages: state.movies.totalPages
});

export default connect(mapStateToProps, { getMovies, setMovieType, loadMoreMovies})(Header);