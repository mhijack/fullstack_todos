import React, {Component} from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

import * as apiCalls from './api';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    }
  }

  componentWillMount = () => {
    this.loadTodos();
  }

  loadTodos = () => {
    // GET data
    fetch(API_URL).then(res => {
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
    }).then(todos => this.setState({todos}))
  }

  // CREATE
  addTodo = value => {
    // POST todo to database
    fetch(API_URL, {
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
    }).then(newTodo => this.setState(prevState => {
      return {
        todos: [
          ...prevState.todos,
          newTodo
        ]
      }
    }))
  }

  // DELETE
  deleteTodo = id => {
    const DELETE_URL = `${API_URL}/${id}`;
    fetch(DELETE_URL, {method: 'delete'}).then(res => {
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
    }).then(() => {
      const todos = this
        .state
        .todos
        .filter(todo => todo._id !== id);
      this.setState({todos})
    })
  }

  // PUT
  toggleTodo = todo => {
    const UPDATE_URL = `${API_URL}/${todo._id}`;
    fetch(UPDATE_URL, {
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
    }).then(updatedTodo => {
      const todos = this.state.todos.map(t => {
        if (t._id === updatedTodo._id) {
          return updatedTodo;
        }
        return t;
      })
      this.setState({todos})
    })
  }

  render() {
    const todos = this
      .state
      .todos
      .map(todo => (<TodoItem
        key={todo._id}
        {...todo}
        onDelete={this
        .deleteTodo
        .bind(this, todo._id)}
        onToggle={this
        .toggleTodo
        .bind(this, todo)}/>));

    return (
      <div>
        <h1>Todo List</h1>
        <TodoForm addTodo={this.addTodo}/>
        <ul>
          {todos}
        </ul>
      </div>
    )
  }
}

export default TodoList;