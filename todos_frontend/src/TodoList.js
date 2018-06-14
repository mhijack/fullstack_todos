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

  // READ
  loadTodos = async() => {
    // Wait for todos be returned from api
    let todos = await apiCalls.getTodos();
    this.setState({todos});
  }

  // CREATE
  addTodo = async value => {
    let newTodo = await apiCalls.createTodo(value);
    this.setState(prevState => {
      return {
        todos: [
          ...prevState.todos,
          newTodo
        ]
      }
    })
  }

  // DELETE
  deleteTodo = async id => {
    await apiCalls.deleteTodo(id);
    const todos = this
      .state
      .todos
      .filter(todo => todo._id !== id);
    this.setState({todos});
  }

  // PUT
  toggleTodo = async todo => {
    const updatedTodo = await apiCalls.toggleTodo(todo);
    const todos = this
      .state
      .todos
      .map(t => {
        return t._id === updatedTodo._id
          ? updatedTodo
          : t
      })
    this.setState({todos});
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