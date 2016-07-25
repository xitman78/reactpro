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
import s from './BlogForm.scss';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as BlogActions from '../../../actions/BlogActions';


class BlogForm extends Component {

  constructor(props) {
    super(props)

    this.state = { value: ''};
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleClick = () => {

    if(this.state.value) {

      console.log('Creating Blog');

      BlogActions.createBlog(this.state.value);


      this.setState({
        value:'',
      });

    }

  };

  render() {
    return (
      <div>
        <TextField
          hintText="Hint Text"
          floatingLabelText="Floating Label Text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <RaisedButton label="Add" primary={true} onClick={this.handleClick} className={s.mybutton}/>
      </div>
    );
  }

}

export default withStyles(BlogForm, s);
