import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import './Overview.scss';
import { IMAGE_URL } from '../../../../services/movies.services';

const Overview = (props) => {
  const { movie } = props;
  const [items, setItems] = useState([]);
  const [details] = useState(movie[0]);
  const [credits] = useState(movie[1]);

  useEffect(() => {
    const detailItems = [
      {
        id: 0,
        name: 'Tagline',
        value: `${details.tagline}`
      },
      {
        id: 1,
        name: 'Budget',
        value: `${numberFormatter(`${details.budget}`, 1)}`
      },
      {
        id: 2,
        name: 'Revenue',
        value: `${numberFormatter(`${details.revenue}`, 1)}`
      },
      {
        id: 3,
        name: 'Status',
        value: `${details.status}`
      },
      {
        id: 4,
        name: 'Release Date',
        value: `${details.release_date}`
      },
      {
        id: 5,
        name: 'Run Time',
        value: `${details.runtime} min`
      }
    ];
    setItems(detailItems);
  }, []);

  const numberFormatter = (number, digits) => {
    const symbolArray = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'K' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'B' }
    ];
    const regex = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let result = '';

    for (let i = 0; i < symbolArray.length; i++) {
      if (number >= symbolArray[i].value) {
        result =
          (number / symbolArray[i].value).toFixed(digits).replace(regex, '$1') +
          symbolArray[i].symbol;
      }
    }
    return result;
  };

  return (
    <div className="overview">
      <div className="overview-column-1">
        <div className="description">{details.overview}</div>
        <div className="cast">
          <div className="div-title">Cast</div>
          <table>
            {
              credits.cast.map((data) => {
                return (
                  <tbody key={uuidv4()}>
                    <tr>
                      <td>
                        <img src={data.profile_path ? `${IMAGE_URL}${data.profile_path}` : "http://placehold.it/54x81"} alt="" />
                      </td>
                      <td>{data.name}</td>
                      <td>{data.character}</td>
                    </tr>
                  </tbody>
                )
              })
            }
          </table>
        </div>
      </div>
      <div className="overview-column-2">
        <div className="overview-detail">
          <h6>Production Companies</h6>
          {
            details.production_companies.map((production) => {
              return (
                <div className="product-company" key={uuidv4()}>
                  <img src={production.logo_path ? `${IMAGE_URL}${production.logo_path}` : "http://placehold.it/30x30"} alt="" />
                  <span>{production.name}</span>
                </div>
              )
            })
          }
          
        </div>
        <div className="overview-detail">
          <h6>Language(s)</h6>
          <p>
            {
              details.spoken_languages.map((language) => {
                return (
                  <a href="!#" key={uuidv4()}>{language.name}</a>
                )
              })
            }
          </p>
        </div>
        <div className="overview-detail">
          <h6>Tagline</h6>
          <p>
            <a href="!#">Tagline</a>
          </p>
        </div>
        {items.map((data) => {
          return (
            <div className="overview-detail" key={data.id}>
              <h6>{data.name}</h6>
              <p>
                <a href="!#">{data.value}</a>
              </p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

Overview.propTypes = {
  movie: PropTypes.array
};

const mapStateToProps = (state) => ({
  movie: state.movies.movie
});

export default connect(mapStateToProps, {})(Overview);
