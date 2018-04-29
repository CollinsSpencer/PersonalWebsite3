import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Portfolio from './Portfolio';
import Home from './Home';
import NoMatch from './NoMatch';

export default () => (
    <Switch>
        <Route path="/" exact render={props => <Home {...props} />} />
        <Route path="/home" exact component={Home} />
        <Route path="/portfolio" exact component={Portfolio} />
        <Route component={NoMatch} />
    </Switch>
);