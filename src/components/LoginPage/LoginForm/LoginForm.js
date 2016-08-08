/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import Location from '../../../core/Location';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LoginForm.scss';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import * as LoginActions from '../../../actions/LoginActions';
import BlogStore from '../../../stores/blogstore';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
//import Alert from '../../Alert';


class LoginForm extends Component {

  constructor(props) {
    super(props);

    this.state = { login: '', password: '', submit: true};

  }

  componentDidMount() {

    BlogStore.on('login_response', this.loginResponse);

  }

  componentWillUnmount() {

    BlogStore.removeListener('login_response', this.loginResponse);

  }

  loginResponse = () => {

    console.log('Login form on login response', BlogStore.login_response);

    if(BlogStore.login_response.success === true ) {
      //console.log('Route ', BlogStore.login_response.redirect_url);
      Location.push(BlogStore.login_response.redirect_url);
    }
    else {
      console.log('This ', this);
      let olds = this.state;
      olds.message = BlogStore.login_response.error;
      olds.alert = true
      olds.disable_inputs = false;
      this.setState(olds);
    }

  };


  handleClose = () => {
    let olds = this.state;
    olds.alert = false;
    this.setState(olds);
  };

  handleChangeLogin = (event) => {

    let login = event.target.value.trim().substr(0,20);
    let submit = !(login.length > 1 && this.state.password.length > 5);

    this.setState({
      login: login,
      password: this.state.password,
      submit: submit
    });

  };

  handleChangePassword = (event) => {

    let password = event.target.value.trim().substr(0,20);
    let submit = !(this.state.login.length > 1 && password.length > 5);

     this.setState({
       login: this.state.login,
       password: password,
       submit: submit
     });

  };

  handleClick = () => {

    console.log('Credentials ', this.state);

    let olds = this.state;
    olds.submit = true;
    olds.disable_inputs = true;

    this.setState(olds);

    LoginActions.login(this.state.login, this.state.password);

  };


  render() {

    const actions = [
      <FlatButton
        label="Okay"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <div>
        <Card>
          <CardTitle
            title="Sign In"
            subtitle="enter your credentials"
          />
          <CardText>
              <TextField
                disabled={this.state.disable_inputs}
                // hintText="Type you email or username"
                floatingLabelText="Login or E-mail"
                value={this.state.login}
                onChange={this.handleChangeLogin}
                fullWidth={true}
              />
              <br />
              <TextField
                disabled={this.state.disable_inputs}
                floatingLabelText="Password"
                value={this.state.password}
                onChange={this.handleChangePassword}
                type="password"
                fullWidth={true}
                errorText=""
              />
            </CardText>
          <CardActions className={s.LoginAction}>
              <RaisedButton
                label="Sign In"
                primary={true}
                disabled={this.state.submit}
                onClick={this.handleClick}
                className={s.SignInButton}
              />
            { this.state.disable_inputs ?
              <CircularProgress
                className={s.LoginProgress}
                size={0.4}
              /> : null
            }
          </CardActions>
        </Card>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.alert ? true : false }
          onRequestClose={this.handleClose}
        >
          { this.state.message }
        </Dialog>
      </div>
    );
  }

}


export default withStyles(LoginForm, s);
