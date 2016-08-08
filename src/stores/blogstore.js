import { EventEmitter } from 'events';

import dispatcher from '../dispatcher';

class BlogStore extends EventEmitter {


    constructor() {
      super();

      this.blogs = [];
      this.login_response = {};
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

        case 'LOADED_BLOG': {
          this.blogs = action.blogs;
          this.emit('change');
          break;
        }

        case 'LOGIN_RESPONSE': {
          this.login_response = action.response;
          this.emit('login_response');
          break;
        }
      }
    }


}

const blogStore = new BlogStore();

dispatcher.register(blogStore.handleActions.bind(blogStore));

global.bss = blogStore;

export default blogStore;
