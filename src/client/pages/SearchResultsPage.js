import React from 'react';
import request from 'superagent';

import SearchForm from '../components/SearchForm';
import SearchResult from '../components/SearchResult';

const navbarStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  width: '100%',
  zIndex: 1000,
  borderRadius: 0
};

class SearchResultsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      results: [],
      currentPage: 0
    };
  }

  componentDidMount() {
    this.unlisten = this.context.router.listenBefore(this.search.bind(this));
    window.addEventListener('scroll', this.scrollHandler.bind(this));
    this.search();
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
            <div className="navbar-header">
              <a className="navbar-brand" href="/">Timeworth</a>
            </div>
            <SearchForm searchText={this.props.location.query.q} />
          </div>
        </nav>
        {resultBody}
        <div className={(!this.state.isLoading) ? 'hidden' : ''} style={{textAlign: 'center'}}>
          <img height="50" width="50" src="/static/assets/spinner.gif" />
        </div>
      </div>
    );
  }

  scrollHandler(e) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight &&
       window.scrollY > this.lastScrollTop && !this.state.isLoading) {
      this.search();
    }

    this.lastScrollTop = window.scrollY;
  }

  search(historyContext) {
    let searchText

    let searchFunc = () => {
      if (this.request === undefined || this.request.xhr.readyState === 4) {
        this.request = request
          .get(`/search?q=${searchText}&from=${this.state.currentPage}`)
          .timeout(5000)
          .end((error, response) => {
            document.title = searchText;

            if (error) {
              this.setState({
                isLoading: false,
                didFail: true,
                searchText: searchText
              });

              return;
            }

            this.setState({
              isLoading: false,
              results: this.state.results.concat(response.body),
              currentPage: this.state.currentPage + 10,
              searchText: searchText
            });
          });
      }
    };

    if (historyContext) {
      if (historyContext.pathname === '/') { return; }

      searchText = historyContext.query.q;

      this.setState({
        currentPage: 0,
        results: [],
        isLoading: true
      }, searchFunc);
    } else {
      searchText = this.props.location.query.q;
      this.setState({
        isLoading: true
      }, searchFunc);
    }
  }
}

SearchResultsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SearchResultsPage;
