import React, { Component } from 'react';
import ListItem from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  checkbox: {
    float : 'left',
    maxWidth : 50
  },

  checked : {
    color : 'gray',
    textDecoration : 'line-through'
  },
  
  item : {
    padding : 20
  }
};

export default class TodoItem extends Component {

  constructor( ) {
    super( );
    this.state = {
      item   : { }
    };
  }

  componentDidMount( ) {
    this.setState( {
      item   : this.props.item,
      styles : styles
    } );
  }

  updateCheck( ) {
    let item = this.state.item;
    item.completed = !item.completed;
    this.props.updateCheck( item );
  }

  getStyle( isComplete ) {
    return isComplete ? styles.checked : { };
  }

  render( ) {
    
    return (
      <ListItem
        className="list-item"
        style={ styles.item } 
        key={ this.state.item.id }>          

        <Checkbox 
          style={ styles.checkbox }
          checked={ this.state.item.completed } 
          onCheck={ this.updateCheck.bind( this ) }
          label="" />

        <h3 className="list-item-text" style={ this.getStyle( this.state.item.completed ) }>{ this.state.item.title }</h3>

      </ListItem>
    );

  }
}