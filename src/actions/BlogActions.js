import dispatcher from '../dispatcher';

export function createBlog(text) {
  console.log('BlogActions dispatch');
  dispatcher.dispatch({
    type: 'CREATE_BLOG',
    text
  });
}

export function loadBlogs() {

  console.log('BlogAction loadBog');

  let req = new XMLHttpRequest();
  req.addEventListener('load', function(event) {

    let data = JSON.parse(req.response);

    data.map( item => (item.text = item.title) );

    console.log('Loaded ', data);

    dispatcher.dispatch({
      type: 'LOADED_BLOG',
      blogs: data
    });

  });

  req.open('GET', 'http://localhost:8000/api/news');

  req.send();


}

/*
export function deleteBlog(id) {
  dispatcher.dispatch({
    type: 'DELETE_BLOG',
    id
  });
} */
