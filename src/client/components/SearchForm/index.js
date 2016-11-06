import React, { Component, PropTypes } from 'react';
import MobileDetect from 'mobile-detect';
import './index.scss';

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

    const detector = new MobileDetect(window.navigator.userAgent);

    this.state = {
      searchText: this.props.searchText || '',
      isMobile: detector.mobile()
    };

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
    if (e) {
      e.preventDefault();
    }

    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId);
    }

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
    const searchText = e.target.value;
    const timeoutId = this.state.isMobile || searchText === '' ?
      null : setTimeout(this.search, 1000);

    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId);
    }

    this.setState({
      timeoutId,
      searchText
    });
  }

  render() {
    return (
      <form className="search-form" method="POST" onSubmit={this.search}>
        <input
          type="text"
          ref="searchField"
          onChange={this.inputHandler}
          onFocus={this.selectText}
          value={this.state.searchText} />
        <input className='btn btn-primary' value="Search" type="submit" />
      </form>
    );
  }
}
