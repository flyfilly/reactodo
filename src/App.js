import React, { Component } from 'react';
import AppBar from "material-ui/AppBar";
import Paper from 'material-ui/Paper';
import TodoList from './components/TodoList';
import LinearProgress from 'material-ui/LinearProgress';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Home from 'material-ui/svg-icons/action/home';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import './App.css';

const styles = {
  loading : {

  },

  loaded : {
    display : 'none'
  }
};

export default class App extends Component {
  constructor( ) {
    super( );
    this.state = {
      todos : [ ]
    }
  }

  componentWillMount( ) {
    this.getTodos( );
  }

  handleCheck( item ) {
    let items = this.state.todos,
        index = items.findIndex( x => x.id === item.id );

    items[ index ] = item;

    this.setState( {
      todos : items
    } );
    
    this.saveTodos( items );
  }

  saveTodos( todos ) {
    localStorage.setItem( 'todos', JSON.stringify( todos ) );        
  }

  loadTodos( ) {
    this.setState( {
      todos : JSON.parse( localStorage.getItem( 'todos' ) )
    }, ( ) => { 
      /* if need to do something after state mutated. */ 
    } );
  }

  getTodos( ) {
    let localStorage = window.localStorage;

    if( !localStorage.getItem( 'todos' ) ) {
      fetch( "https://jsonplaceholder.typicode.com/todos?userId=1" )
      .then( (res ) => res.json( ) )
      .then( json => {
        this.saveTodos( json );
        this.loadTodos( );
      } )
      .catch( err => {
        console.error( err );
      } );
    } else {
      this.loadTodos( );
      
    }

  }

  something( ) {
    console.log( "clicked" );
  }

  render( ) {
    return (
      <div className="App">
        <AppBar
          title="React Todo Example"
          onLeftIconButtonTouchTap={ this.something }
          iconElementLeft={ <IconButton><Home /></IconButton> }
          iconElementRight={ <IconButton><ArrowForward /></IconButton> }>
          
        </AppBar>
        <h1 className="todo-header">Todo List ({ this.state.todos.length })</h1>
        <Paper 
          className="content" 
          zDepth={3}>
          
          <Toolbar>
            <ToolbarTitle text="Let's do it!" />
            <ToolbarGroup firstChild={true}>
              {/* put filters here */}
            </ToolbarGroup>            
          </Toolbar>
          <LinearProgress 
            mode="indeterminate" 
            color="#003258"
            style={ this.state.todos.length > 0 ? styles.loaded : styles.loading } />

          <TodoList 
            todos={ this.state.todos } 
            handleCheck={ this.handleCheck.bind( this ) }/>
        </Paper>
      </div>
    );
  }
}