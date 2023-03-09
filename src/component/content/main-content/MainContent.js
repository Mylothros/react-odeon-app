import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './MainContent.scss';
import Slideshow from '../slideshow/Slideshow';
import Paginate from '../paginate/Paginate';
import Grid from '../grid/Grid';
import { IMAGE_URL } from '../../../services/movies.services';

const MainContent = (props) => {
    const { list } = props;
    const IMAGES = [
        {
            url: "https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background_1258-28311.jpg?w=2000",
            rating: 7.5
        },
        {
            url: "https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg",
            rating: 8.5
        },
        {
            url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
            rating: 9.4
        },
        {
            url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
            rating: 6.2
        },
        {
            url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
            rating: 10
        }
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const [images, setImages] = useState([]);
    const randomMovies = list.sort(() => Math.random() - Math.random()).slice(0, 4);

    useEffect(() => {
        if (randomMovies.length) {
            const IMAGES = [
                {
                    id: 1,
                    url: `${IMAGE_URL}/${randomMovies[0].backdrop_path}`
                },
                {
                    id: 2,
                    url: `${IMAGE_URL}/${randomMovies[1].backdrop_path}`
                },
                {
                    id: 3,
                    url: `${IMAGE_URL}/${randomMovies[2].backdrop_path}`
                },
                {
                    id: 4,
                    url: `${IMAGE_URL}/${randomMovies[3].backdrop_path}`
                }
            ]
            setImages(IMAGES)
        }
    }, []);

    const paginate = (type) => {
        if (type === 'prev' && currentPage > 1) {
            setCurrentPage((prev) => prev - 1)
        }
        else {
            setCurrentPage((prev) => prev + 1)
        }
    }

    return (
        <div className="main-content">
            <Slideshow images={images} auto={true} showArrows={true} />
            <div className="grid-movie-title">
                <div className="movieType">Now Playing</div>
                <div className="paginate">
                    <Paginate paginate={paginate} totalPages={20} currentPage={currentPage}/>
                </div>
            </div>
            <Grid images={images}/>
        </div>
    )
}

MainContent.propTypes = {
    list: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    list: state.movies.list
});

export default connect(mapStateToProps, {})(MainContent);