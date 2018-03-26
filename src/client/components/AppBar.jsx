import React from 'react';
import { Menu, Icon, Label } from 'semantic-ui-react';


export default class AppBar extends React.Component {
  constructor(props){
    super();
  }
  render(){
    return(
      <Menu className='AppBar'>
        <Menu.Item>
          <Icon name='check square' size='big' />
        </Menu.Item>
        <Menu.Item>
          <h5> To Do </h5>
        </Menu.Item>
      </Menu>
    );
  }
}
