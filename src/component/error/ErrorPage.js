import React from 'react';
import { Link } from 'react-router-dom';

import './ErrorPage.scss';

const ErrorPage = () => {
    return (
        <div className="error-page">
            <h1 className="error-header">
                Not Here :)
            </h1>
            <p className="error-msg">
                There is something peculiar here hmmmm...
            </p>
            <Link className="error-link" to={'/'}>
                <i className="icon-home"></i> Go back home :)
            </Link>
        </div>
    )
}

export default ErrorPage;