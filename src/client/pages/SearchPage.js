import React from 'react';
import SearchForm from '../components/SearchForm';

const containerStyle = {
  textAlign: 'center',
  marginTop: '20%'
};

class SearchPage extends React.Component {
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

export default SearchPage;
