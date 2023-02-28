import React, { useState } from 'react'

import './MainContent.scss'
import Slideshow from '../slideshow/Slideshow'
import Paginate from '../paginate/Paginate'

const MainContent = () => {
    const images = [
        {
            url: "https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background_1258-28311.jpg?w=2000"
        },
        {
            url: "https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg"
        },
        {
            url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
        }
    ];

    const [currentPage, setCurrentPage] = useState(1);

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
        </div>
    )
}

export default MainContent;