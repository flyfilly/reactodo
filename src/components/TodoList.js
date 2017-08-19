import React, { Component } from 'react';
import List from 'material-ui/List';
import TodoItem from './TodoItem'

export default class TodoList extends Component {

  updateCheck( item ) {
    this.props.handleCheck( item );
  }

  render( ) {
    let todos = this.props.todos.map( item => {
      return (
        <TodoItem 
          key={ item.id } 
          item={ item }
          updateCheck={ this.updateCheck.bind( this ) } />
      );
    } );

    return (
      <div> 
        <List>{ todos }</List>
      </div>
    );
  }
}