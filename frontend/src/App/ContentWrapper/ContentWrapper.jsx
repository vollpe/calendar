import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import AvailabilityCalendarPage from './pages/AvailabilityCalendarPage/AvailabilityCalendarPage';
import Page404 from './pages/ErrorPages/Page404';
import AssignedRequests from './pages/AssignedRequests/AssignedRequests';

function ConnectedContentWrapper({ isDataLoading }) {
  return (
    <div className="content-wrapper pb-3">
      <Switch>
        <Route path="/calendar" component={AvailabilityCalendarPage} />
        <Route path="/assignments" render={() => <AssignedRequests isDataLoading={isDataLoading} />} />
        <Route component={Page404} />
      </Switch>
    </div>
  );
}

ConnectedContentWrapper.propTypes = {
  isDataLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  error: state.error,
  errorMessage: state.errorMessage,
  isDataLoading: state.isDataLoading,
  facilitatorId: state.facilitatorId,
});

const ContentWrapper = connect(
  mapStateToProps, null, null, { pure: false },
)(ConnectedContentWrapper);

export default ContentWrapper;
