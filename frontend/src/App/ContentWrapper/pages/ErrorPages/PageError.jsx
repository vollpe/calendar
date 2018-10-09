import React from 'react';
import PropTypes from 'prop-types';

function PageError({ errorMessages }) {
  return (
    <div>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Error Page</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="error-page">
          <h3 className="headline text-danger">
            <i className="fa fa-exclamation-circle" />
          </h3>
          <div className="error-content  p-3">
            <h3>
              Sorry... Something went wrong.
            </h3>
            <div className="validation-message-container">
              {errorMessages}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

PageError.propTypes = {
  errorMessages: PropTypes.instanceOf(Array),
};


PageError.defaultProps = {
  errorMessages: [],
};

export default PageError;
