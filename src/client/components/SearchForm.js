import React, { Component, PropTypes } from 'react';

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

export default class SearchForm extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    searchText: PropTypes.string
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static defaultProps = {
    autoFocus: false,
    searchText: null
  }

  constructor(props) {
    super(props);

    this.state = {searchText: this.props.searchText || ''};
    this.search = this.search.bind(this);
    this.selectText = this.selectText.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
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
    this.refs.searchField.blur();
  }

  selectText(e) {
    e.target.select();
  }

  inputHandler(e) {
    this.setState({searchText: e.target.value});
  }

  render() {
    return (
      <form method="POST" onSubmit={this.search} style={formStyle}>
        <input
          type="text"
          ref="searchField"
          style={textFieldStyle}
          onChange={this.inputHandler}
          onFocus={this.selectText}
          value={this.state.searchText} />
        <input className='btn btn-primary' value="Search" type="submit" />
      </form>
    );
  }
}
