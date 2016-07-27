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
import BlogStore from '../../stores/blogstore';
import BlogForm from './BlogForm';
import * as BlogActions from '../../actions/BlogActions';
import IconButton from 'material-ui/IconButton';
import RefreshButton from 'material-ui/svg-icons/navigation/refresh';
import FontIcon from 'material-ui/FontIcon';
import {Observable}  from 'rxjs/Observable';
import 'rxjs/Rx';


const title = 'Blog';

class BlogPage extends Component {

  //text_value = 'Hi';

  constructor(props) {
    super(props);

    this.getBlogs = this.getBlogs.bind(this);
    this.state = {
        blogs: BlogStore.getAll()
    };

    // this.s$ = new Observable(orserver => {
    //   let count = 0;
    //   let interval = setInterval(() => {
    //     orserver.next(count++);
    //   }, 1000);
    //
    //   return () => clearInterval(interval);
    // });

  }

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {

    this.context.onSetTitle(title);

    BlogStore.on('change', this.getBlogs);

    console.log('count', BlogStore.listenerCount('change'));

    BlogActions.loadBlogs();
  }

  getBlogs() {
    this.setState({
      blogs: BlogStore.getAll()
    });
  }

  componentWillUnmount() {

    BlogStore.removeListener('change', this.getBlogs)

    // if(this.unsub) this.unsub.unsubscribe();

  }

  reloadClick() {
    console.log('Reload clicked ');
    BlogActions.loadBlogs();

    // this.unsub = this.s$.subscribe( value => console.log(value) );
  }


  render() {

    const { blogs } = this.state;

    const BlogComponents = blogs.map((blog) => {
      return <p key={blog.id}>{blog.text}</p>
    });
    
    return (
      <div className={s.container}>
        <h1>{title}</h1>
        <IconButton
          onClick={this.reloadClick.bind(this)}
          tooltip="Reload blogs"
          tooltipPosition="top-center">
          <RefreshButton />
        </IconButton>
        {BlogComponents}
        <BlogForm />
      </div>
    );
  }

}


export default withStyles(BlogPage, s);
