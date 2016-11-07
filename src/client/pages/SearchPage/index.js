import React, { Component } from 'react';
import SearchForm from '../../components/SearchForm';
import './index.scss';

export default class SearchPage extends Component {
  componentDidMount() {
    document.title = 'Timeworthy';
  }

  render() {
    return (
      <div className='search-page'>
        <h1>Timeworthy</h1>
        <div className='summary'>
          Game cost per hour made easy
        </div>
        <SearchForm autoFocus={true} />
      </div>
    );
  }
}
