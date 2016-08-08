import dispatcher from '../dispatcher';

export function login(login, password) {

  console.log('LoginActions dispatch');

  let params = { login , password };

  let req = new XMLHttpRequest();

  let send_data = JSON.stringify(params);

  req.open('POST', '/api/login');
  req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  req.send(send_data);

  req.addEventListener('load', function(event) {

    let res = JSON.parse(req.response);

    console.log('Response ', res);

     dispatcher.dispatch({
       type: 'LOGIN_RESPONSE',
       response: res
     });

  });

}
