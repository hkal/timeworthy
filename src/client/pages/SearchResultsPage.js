import React, { Component, PropTypes } from 'react';
import request from 'superagent';

import SearchForm from '../components/SearchForm';
import SearchResult from '../components/SearchResult';
import SpinnerGif from '../assets/spinner.gif';

const navbarStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  width: '100%',
  zIndex: 1000,
  borderRadius: 0
};

export default class SearchResultsPage extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      results: [],
      currentPage: 0,
      infiniteScrollDisabled: false
    };

    this.search = this.search.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.scrollHandler = this.scrollHandler.bind(this);
  }

  componentDidMount() {
    this.unlisten = this.context.router.listenBefore(this.onSearch);
    window.addEventListener('scroll', this.scrollHandler);
    this.onSearch();
  }

  componentWillUnmount() {
    this.unlisten();
    window.removeEventListener('scroll', this.scrollHandler);
  }

  render() {
    let resultBody;

    if (this.state.results.length > 0) {
      resultBody = (
        <div className='row'>
          {this.state.results.map((game, index) => {
            return (
              <div key={'div' + index}className='col-md-4'>
                <SearchResult key={index} game={game} />
              </div>
            );
          })}
        </div>
      );
    }

    if (this.state.didFail) {
      resultBody = (
        <div>
          <h1>An error has occurred</h1>
        </div>
      );
    }

    return (
      <div>
        <nav className="navbar navbar-default" style={navbarStyle}>
          <div className="container">
            <div className="navbar-header hidden-xs">
              <a className="navbar-brand" href="/">Timeworthy</a>
            </div>
            <SearchForm searchText={this.props.location.query.q} />
          </div>
        </nav>
        {resultBody}
        <div className={(!this.state.isLoading) ? 'hidden' : ''} style={{textAlign: 'center'}}>
          <img height="50" width="50" src={SpinnerGif} />
        </div>
      </div>
    );
  }

  scrollHandler(e) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight
        && window.scrollY > this.lastScrollTop
        && !this.state.isLoading
        && !this.state.infiniteScrollDisabled) {
      this.onSearch();
    }

    this.lastScrollTop = window.scrollY;
  }

  onSearch(historyContext) {
    if (historyContext) {
      if (historyContext.pathname === '/') { return; }

      const searchText = historyContext.query.q;

      this.setState({
        currentPage: 0,
        results: [],
        isLoading: true,
        infiniteScrollDisabled: false,
      }, this.search(searchText));
    } else {
      const searchText = this.props.location.query.q;

      this.setState({
        isLoading: true,
        infiniteScrollDisabled: false,
      }, this.search(searchText));
    }
  }

  search(searchText) {
    return () => {
      if (this.request === undefined || this.request.xhr.readyState === 4) {
        this.request = request
          .get(`/search?q=${searchText}&from=${this.state.currentPage}`)
          .timeout(5000)
          .end((error, response) => {
            document.title = searchText;

            if (error) {
              this.setState({
                isLoading: false,
                didFail: true
              });

              return;
            }

            if (response.body.length === 0) {
              this.setState({
                isLoading: false,
                infiniteScrollDisabled: true
              });

              return;
            }

            this.setState({
              isLoading: false,
              results: this.state.results.concat(response.body),
              currentPage: this.state.currentPage + 10
            });
          });
      }
    };
  }
}
