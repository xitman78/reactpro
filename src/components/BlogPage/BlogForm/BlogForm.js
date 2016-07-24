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
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


class BlogForm extends Component {

  constructor(props) {
    super(props)

    this.state = { value: 'Hi'};
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleClick = () => {
    this.setState({
      value:'',
    });
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
        <RaisedButton label="Reset" primary={true} onClick={this.handleClick}/>
      </div>
    );
  }

}

export default BlogForm;
