import React from 'react';
import { Link } from 'react-router-dom';

function Page404() {
  return (
    <div>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>404 Error Page</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="error-page">
          <h2 className="headline text-warning"><i className="fa fa-warning" /></h2>
          <div className="error-content p-3">
            <h3>
              Oops! Page not found.
            </h3>
            <p>
              We could not find the page you were looking for.
              Meanwhile, you may return to
              {' '}
              <Link to="/calendar">calendar</Link>
              , because it is the only feature implemented.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Page404;
