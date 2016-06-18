import React, { Component, PropTypes } from 'react';
import MobileDetect from 'mobile-detect';

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
      <form method="POST" onSubmit={this.search} style={formStyle}>
        <input
          type="text"
          ref="searchField"
          style={
            this.state.isMobile ?
              {
                ...textFieldStyle,
                fontSize: '16px'
              } : textFieldStyle
          }
          onChange={this.inputHandler}
          onFocus={this.selectText}
          value={this.state.searchText} />
        <input className='btn btn-primary' value="Search" type="submit" />
      </form>
    );
  }
}
