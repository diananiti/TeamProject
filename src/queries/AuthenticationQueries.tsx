const request = (options: any) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  if (localStorage.getItem('ACCESS_TOKEN')) {
    headers.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export async function login(loginRequest: any) {
  return await request({
    url: 'http://localhost:8080/api' + '/auth/signin',
    method: 'POST',
    body: JSON.stringify(loginRequest),
  });
}

export function signup(signupRequest: any) {
  return request({
    url: 'http://localhost:8080/api' + '/auth/signup',
    method: 'POST',
    body: JSON.stringify(signupRequest),
  });
}
