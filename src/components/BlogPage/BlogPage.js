/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BlogPage.scss';
import BlogForm from './BlogForm';

const title = 'Blog';

class BlogPage extends Component {

  //text_value = 'Hi';

  constructor(props) {
    super(props);
  }

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.onSetTitle(title);
  }


  render() {
    return (
      <div className={s.container}>
        <h1>{title}</h1>
        <p>This is our blog page!</p>
        <BlogForm />
      </div>
    );
  }

}

export default withStyles(BlogPage, s);
