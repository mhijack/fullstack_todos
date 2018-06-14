import React, {Component} from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const API_URL = '/api/todos';

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
    // Fetch data
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

  // TODO
  addTodo = value => {
    // Add todo to database
    fetch(API_URL, {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json',
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
      // If no err, return data
      return res.json();
    }).then(todos => this.setState({todos}))
  }

    render() {
      const todos = this
        .state
        .todos
        .map(todo => (<TodoItem key={todo._id} {...todo}/>));

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