import React from 'react';
import SignInPage from './signInPage';
import SignUpPage from './signUpPage';
import { Route, Switch } from 'react-router-dom';

const SignPage = () => {
    return(
        <div>
            <Switch>
                <Route path='/' exact component={ SignUpPage } />
                <Route path='/signinpage' exact component={ SignInPage } />
            </Switch>
        </div>
    )
}


export default SignPage;