import React from 'react';
import { Grid } from '@material-ui/core';

// import Card from 'react-bootstrap/Card';

import { connect } from 'react-redux';

import { withRouter  } from 'react-router-dom';
import { searchClubs } from '../actions/catalog';
import './GridComponent.css';
import { filterClubs } from '../utils/filterClubs';
import ClubCard from './ClubCard';

function GridComponent({ tagOptions, clubs, num_clubs, loading, formDetails, num_displayed }) {

  const [num_filtered_results, filteredClubs] = filterClubs(clubs, formDetails, tagOptions, num_displayed)
  
  const GridList = filteredClubs.map((club, i) => <ClubCard tagOptions={tagOptions} club={club}/>);

  return (
    <div className="wrapper">
      <div className="num-results">
        {num_clubs ? `Displaying ${num_clubs} Results` : loading ? '' : 'No Results Found'}
      </div>
      <Grid justify='space-between' container className="card-grid">
        {GridList}
      </Grid>
    </div>
  );
}

// This function gets a piece of the app state that is stored in redux store
const mapStateToProps = (state) => ({
  clubs: state.catalog.allOrganizations,
  num_clubs: state.catalog.num_clubs,
  formDetails: state.catalog.formDetails,
  tagOptions: state.profile.tagOptions,
  num_displayed: state.catalog.num_displayed
});

export default connect(mapStateToProps, { searchClubs })(
  withRouter(GridComponent)
);
