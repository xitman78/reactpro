import dispatcher from '../dispatcher';

export function createBlog(text) {
  console.log('BlogActions dispatch');
  dispatcher.dispatch({
    type: 'CREATE_BLOG',
    text
  });
}

/*
export function deleteBlog(id) {
  dispatcher.dispatch({
    type: 'DELETE_BLOG',
    id
  });
} */
