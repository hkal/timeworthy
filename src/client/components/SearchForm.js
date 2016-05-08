import React from 'react';

const formStyle = {
  margin: '5px 0'
};

const textFieldStyle = {
  outline: 'none',
  padding: '10px',
  marginRight: '10px',
  width: '60%'
};

const buttonStyle = {
  padding: '10px 12px',
  marginTop: '-3px'
};

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchText: this.props.searchText || ''};
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.refs.searchField.focus();
    }
  }

  search(e) {
    e.preventDefault();

    const searchPath = '/results';

    this.context.router.push({
      pathname: searchPath,
      query: {
        q: this.state.searchText
      }
    });
  }

  inputHandler(e) {
    this.setState({searchText: e.target.value});
  }

  render() {
    return (
      <form method="POST" onSubmit={this.search.bind(this)} style={formStyle}>
        <input
          type="text"
          ref="searchField"
          style={textFieldStyle}
          onChange={this.inputHandler.bind(this)}
          value={this.state.searchText} />
        <input className='btn btn-primary' value="Search" type="submit" />
      </form>
    );
  }
}

SearchForm.contextTypes = {
  router: React.PropTypes.object.isRequired,
  autoFocus: React.PropTypes.bool
}

export default SearchForm;