import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner/Spinner';

function AssignedRequests({ isDataLoading }) {
  if (isDataLoading) {
    return <Spinner />;
  }
  return (
    <div className="container-fluid scrolling-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <h1>
                        Assigned Requests
          </h1>
        </div>
      </section>
      <section className="content-fixed">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-2 col-3-sm col-1-md col-1-lg col-1-xl">
                  <h4 className="card-title m-1">List View</h4>
                </div>
                <div className="col-3 col-3-sm col-1-md col-1-lg col-1-xl">
                  <h4 className="card-title m-1">Schedule View</h4>
                </div>
                <div className="card-tools col-2 col-3-sm col-1-md col-1-lg col-1-xl ml-auto">
                  <div
                    className="input-group input-group-sm input-group-lg float-right search-input"
                  >
                    <input
                      type="text"
                      name="table_search"
                      className="form-control float-right"
                      placeholder="Search"
                    />
                    <div className="input-group-append">
                      <button
                        type="submit"
                        className="btn btn-default mr-3 mr-sm-3 mr-md-3 mr-lg-2 mr-xl-1 border"
                      >
                        <i className="fa fa-search" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="form-group">
                <div>
                  <div>
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Status</th>
                          <th>Author</th>
                          <th>Property, Address</th>
                          <th>Notes</th>
                          <th>Date and Time of the visit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>17</td>
                          <td>Resolved</td>
                          <td>Alex Pierce</td>
                          <td>
                                                    Property name #1, Lorem ipsum dolor sit amet,
                                                    Lorem ipsum, City, State, 123456B
                          </td>
                          <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
                          <td>01.12.2015 10:00 - 11:00+</td>
                        </tr>
                        <tr>
                          <td>17</td>
                          <td>Resolved</td>
                          <td>Alex Pierce</td>
                          <td>
                                                    Property name #1, Lorem ipsum dolor sit amet,
                                                    Lorem ipsum, City, State, 123456B
                          </td>
                          <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
                          <td>01.12.2015 10:00 - 11:00+</td>
                        </tr>
                        <tr>
                          <td>17</td>
                          <td>Resolved</td>
                          <td>Alex Pierce</td>
                          <td>
                                                    Property name #1, Lorem ipsum dolor sit amet,
                                                    Lorem ipsum, City, State, 123456B
                          </td>
                          <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
                          <td>01.12.2015 10:00 - 11:00+</td>
                        </tr>
                        <tr>
                          <td>17</td>
                          <td>Resolved</td>
                          <td>Alex Pierce</td>
                          <td>
                                                    Property name #1, Lorem ipsum dolor sit amet,
                                                    Lorem ipsum, City, State, 123456B
                          </td>
                          <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
                          <td>01.12.2015 10:00 - 11:00+</td>
                        </tr>
                        <tr>
                          <td>17</td>
                          <td>Resolved</td>
                          <td>Alex Pierce</td>
                          <td>
                                                    Property name #1, Lorem ipsum dolor sit amet,
                                                    Lorem ipsum, City, State, 123456B
                          </td>
                          <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
                          <td>01.12.2015 10:00 - 11:00+</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <nav aria-label="..." className="float-right">
                    <ul className="pagination">
                      <li className="page-item disabled">
                        <a className="page-link" href="/" tabIndex="-1">Previous</a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="/">1</a>
                      </li>
                      <li className="page-item disabled">
                        <a className="page-link" href="/">Next</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

AssignedRequests.propTypes = {
  isDataLoading: PropTypes.bool.isRequired,
};

export default AssignedRequests;
