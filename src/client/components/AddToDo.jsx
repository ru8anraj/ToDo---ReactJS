import React from 'react';
import { Input } from 'semantic-ui-react';

export default class AddToDo extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
  }
  handleAdd(event){
    if (event.key == 'Enter') {
      var value = event.target.value;
      this.props.handleNewToDo(value);
      event.target.value = '';
    }
  }
  render() {
    return(
      <Input className='AddToDo' icon='add' placeholder='Add New' onKeyPress={this.handleAdd} />
    );
  }
}
