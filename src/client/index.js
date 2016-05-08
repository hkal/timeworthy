import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import BaseLayout from './pages/BaseLayout';
import SearchPage from './pages/SearchPage';
import SearchResultsPage from './pages/SearchResultsPage';

import 'bootstrap/dist/css/bootstrap.min.css';

render((
  <Router history={browserHistory}>
    <Route path='/' component={BaseLayout}>
      <IndexRoute component={SearchPage}/>
    </Route>
    <Route path='/results' component={BaseLayout}>
      <IndexRoute component={SearchResultsPage}/>
    </Route>
  </Router>
), document.getElementById('application'));
