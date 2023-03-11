import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import './Media.scss';
import { IMAGE_URL } from '../../../../services/movies.services';

const Media = (props) => {
  const { movie } = props;
  const [media] = useState(movie[2]);
  const [videos] = useState(movie[3]);

  return (
    <>
      <div className="media">
        <div>
          <div className="media-title">Watch Trailer</div>
          <div className="media-videos">
            {
              videos.results.map((video) => {
                return (
                  <div className="video" key={uuidv4()}>
                    <iframe
                      title="Avengers"
                      style={{
                        width: '100%',
                        height: '100%'
                      }}
                      src={`https://www.youtube.com/embed/${video.key}`}
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
        <div>
          <div className="media-title">Photos ({media.posters.length})</div>
          <div className="media-images">
            {
              media.posters.map((poster) => {
                return (
                  <div
                    key={uuidv4()}
                    className="image-cell"
                    style={{
                      backgroundImage:
                        `url(${IMAGE_URL}${poster.file_path})`
                    }}
                  />
                )
              })
            }    
          </div>
        </div>
      </div>
    </>
  )
};

Media.propTypes = {
  movie: PropTypes.array
};

const mapStateToProps = (state) => ({
  movie: state.movies.movie
});

export default connect(mapStateToProps, {})(Media);
