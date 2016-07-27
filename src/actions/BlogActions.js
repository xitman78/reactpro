import dispatcher from '../dispatcher';

export function createBlog(text) {
  console.log('BlogActions dispatch');

  let params = { "_id": '' + Date.now(), "title": text, "body": "somebody"};

  let req = new XMLHttpRequest();

  let send_data = JSON.stringify(params);

  req.open('POST', 'http://localhost:8000/api/news');
  req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  req.send(send_data);

  req.addEventListener('load', function(event) {

    console.log('Saved ', JSON.parse(req.response));

    dispatcher.dispatch({
      type: 'CREATE_BLOG',
      text
    });

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
