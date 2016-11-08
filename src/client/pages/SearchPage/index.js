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
        <div className='suggestions'>
          <div>
            Try searching for&nbsp;
          </div>
          <ul>
            <li className="red">Witcher</li>
            <li className="green">Elder Scrolls</li>
            <li className="orange">Fallout</li>
            <li className="blue">Mass Effect</li>
          </ul>
        </div>
      </div>
    );
  }
}
