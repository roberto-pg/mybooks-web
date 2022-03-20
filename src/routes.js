import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { isAuthenticated } from '../src/services/auth';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Library from './pages/Library';
import NewBook from './pages/NewBook';
import Detail from './pages/Detail';

export function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={props => (
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                )
        )} />
    )
}

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Logon} />
                {/* <Route path="/register" component={Register} /> */}
                <PrivateRoute path="/register" component={Register} />
                {/* <Route path="/profile" component={Profile} /> */}
                <PrivateRoute path="/library" component={Library} />
                {/* <Route path="/incidents/new" component={NewIncident} /> */}
                <PrivateRoute path="/books/new" component={NewBook} />
                <PrivateRoute path="/detail/:id" component={Detail} />
            </Switch>
        </BrowserRouter>
    );
}