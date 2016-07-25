import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

class BlogStore extends EventEmitter {


    constructor() {
      super();

      this.blogs = [
        {id: 1, text: 'First Blog'},
        {id: 2, text: 'Second Blog'}
      ];
    }

    getAll() {
      return this.blogs;
    }

    createBlog(text) {

      const id = Date.now();

      this.blogs.push({ id, text});

      this.emit('change');

    }

    handleActions(action) {

      console.log('BlogStore received an action ', action);

      switch(action.type) {
        case 'CREATE_BLOG': {
          this.createBlog(action.text);
          break;
        }
      }
    }


}

const blogStore = new BlogStore();

dispatcher.register(blogStore.handleActions.bind(blogStore));

//window.blogStore = blogStore;

export default blogStore;
