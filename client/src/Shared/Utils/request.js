const baseUrl = 'http://192.168.1.141:4200';

export function makePost(endpoint, data) {
  let token = localStorage.getItem('token');
  console.log(data);
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
      console.log(json);
      return json;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
}

export function makeGet(endpoint) {
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
      console.log(response);
      if (response.status === 200) {
        return response.json();
      } else {
        return 'Error';
      }
    })
    .then(json => {
      console.log(json);
      return json;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
}

export async function register(data) {
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
        console.log(json);
        localStorage.setItem('token', json.token);
        localStorage.setItem('userId', String(json.userId));
        return 'LoggedIn';
      }
    })
    .catch(function (error) {
      console.log(error);
      return 'Error ' + error.toString();
    });
}

export function login(data, setLoggedIn) {
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
      console.log(response.status);
      if (response.status === 200) {
        setLoggedIn();
        return response.json();
      } else {
        return 'Error';
      }
    })
    .then(json => {
      if (json !== 'Error') {
        console.log('userId: ' + json.userId);
        localStorage.setItem('token', json.token);
        localStorage.setItem('userId', String(json.userId));
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
      console.log(response.status);
      if (response.status === 200) {
        setLoggedIn();
        return response.json();
      } else {
        return 'Error';
      }
    })
    .then(json => {
      if (json !== 'Error') {
        return true;
      }
    })
    .catch(function (error) {
      console.log(error);
      return 'Error';
    });
}
