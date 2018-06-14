const API_URL = '/api/todos';

export const getTodos = async() => {
  // GET data
  return fetch(API_URL).then(res => {
    if (!res.ok) {
      // If server returns err
      if (res.status >= 400 && res.status < 500) {
        return res
          .json()
          .then(data => {
            let err = {
              errorMessage: data.message
            };
            throw err;
          })
      } else {
        // If server err
        let err = {
          errorMessage: 'Server not responding. Please try again later.'
        };
        throw err;
      }
    }
    // If no err, return data
    return res.json();
  })
}

export const createTodo = async value => {
  // POST todo to database
  return fetch(API_URL, {
    method: 'post',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({name: value})
  }).then(res => {
    if (!res.ok) {
      // If server returns err
      if (res.status >= 400 && res.status < 500) {
        return res
          .json()
          .then(data => {
            let err = {
              errorMessage: data.message
            };
            throw err;
          })
      } else {
        // If server err
        let err = {
          errorMessage: 'Server not responding. Please try again later.'
        };
        throw err;
      }
    }
    // If no err, communicate with database
    return res.json();
  });
}

export const deleteTodo = async id => {
  const DELETE_URL = `${API_URL}/${id}`;
  return fetch(DELETE_URL, {method: 'delete'}).then(res => {
    if (!res.ok) {
      // If server returns err
      if (res.status >= 400 && res.status < 500) {
        return res
          .json()
          .then(data => {
            let err = {
              errorMessage: data.message
            };
            throw err;
          })
      } else {
        // If server err
        let err = {
          errorMessage: 'Server not responding. Please try again later.'
        };
        throw err;
      }
    }
    // If no err, communicate with database
    return res.json();
  })
}

export const toggleTodo = async todo => {
  const UPDATE_URL = `${API_URL}/${todo._id}`;
  return fetch(UPDATE_URL, {
    method: 'put',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({
      completed: !todo.completed
    })
  }).then(res => {
    if (!res.ok) {
      // If server returns err
      if (res.status >= 400 && res.status < 500) {
        return res
          .json()
          .then(data => {
            let err = {
              errorMessage: data.message
            };
            throw err;
          })
      } else {
        // If server err
        let err = {
          errorMessage: 'Server not responding. Please try again later.'
        };
        throw err;
      }
    }
    // If no err, communicate with database
    return res.json();
  });
}