import { MOVIE_LIST, SET_ERROR, RESPONSE_PAGE } from '../types';

import { MOVIE_API_URL } from '../../services/movies.services';

export const getMovies = (type, pageNumber) => async dispatch => {
    try {
        const movies = await MOVIE_API_URL(type, pageNumber);
        const { results, page, total_pages } = movies.data;
        const payload = {
            page,
            totalPages: total_pages
        }
        dispatchMethod(MOVIE_LIST, results, dispatch);
        dispatchMethod(RESPONSE_PAGE, payload, dispatch);
    } catch (error)
    {
        if (error.response) {
            dispatchMethod(SET_ERROR, error.response.data.message, dispatch)
        }
    }
};

const dispatchMethod = (type, payload, dispatch) => {
    dispatch({
        type,
        payload
    });
};