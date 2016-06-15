import React, { Component } from 'react';
import SearchForm from '../components/SearchForm';

const containerStyle = {
  textAlign: 'center',
  marginTop: '20%'
};

export default class SearchPage extends Component {
  componentDidMount() {
    document.title = 'Timeworthy';
  }

  render() {
    return (
      <div style={containerStyle}>
        <h1>Timeworthy</h1>
        <SearchForm autoFocus={true} />
      </div>
    );
  }
}
