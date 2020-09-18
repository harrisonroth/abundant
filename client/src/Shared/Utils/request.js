export const baseUrl = 'http://192.168.2.114:4210';

export function makePost(endpoint, data, callback) {
  let token = localStorage.getItem('token');
  return fetch(baseUrl + endpoint, {
    method: 'POST',
    headers: {
      'x-access-token': token,
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else {
        return 'Error';
      }
    })
    .then(json => {
      if (callback) {
        callback(json);
      }
      return json;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
}

export function makeGet(endpoint, callback) {
  let token = localStorage.getItem('token');
  return fetch(baseUrl + endpoint, {
    method: 'GET',
    headers: {
      'x-access-token': token,
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else {
        return 'Error';
      }
    })
    .then(json => {
      callback(json);
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
}

export function register(data, setLoggedIn) {
  return fetch(baseUrl + '/auth/register', {
    method: 'POST',
    headers: {
      'x-access-token': '',
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else {
        return 'Error';
      }
    })
    .then(json => {
      if (json !== 'Error') {
        localStorage.setItem('token', json.token);
        localStorage.setItem('userId', String(json.userId));
        localStorage.setItem('user', json.user);
        setLoggedIn();
        return 'LoggedIn';
      }
    })
    .catch(function (error) {
      console.log(error);
      return 'Error ' + error.toString();
    });
}

export function login(data, setLoggedIn, setError) {
  return fetch(baseUrl + '/auth/login', {
    method: 'POST',
    headers: {
      'x-access-token': '',
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else {
        setError();
        return 'Error';
      }
    })
    .then(json => {
      if (json !== 'Error') {
        localStorage.setItem('token', json.token);
        localStorage.setItem('userId', String(json.userId));
        localStorage.setItem('user', json.user);
        setLoggedIn();
        return 'LoggedIn';
      }
    })
    .catch(function (error) {
      console.log(error);
      return 'Error ' + error;
    });
}

export function checkAuth(setLoggedIn) {
  var token = localStorage.getItem('token');
  localStorage.removeItem('user');
  if (token == null) return 'Error';
  return fetch(baseUrl + '/auth/checkAuth', {
    method: 'GET',
    headers: {
      'x-access-token': token,
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else {
        return 'Error';
      }
    })
    .then(json => {
      if (json !== 'Error') {
        setLoggedIn(json.user);
        console.log(json.user);
        localStorage.setItem('user', json.user);
        return true;
      }
    })
    .catch(function (error) {
      console.log(error);
      return 'Error';
    });
}
