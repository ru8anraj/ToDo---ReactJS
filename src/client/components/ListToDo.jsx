import React from 'react';
import { Segment, Grid, Checkbox, Icon } from 'semantic-ui-react';

export default class ListToDo extends React.Component {
  constructor(props) {
    super(props);
    // this.handleList = this.handleList.bind(this);
    // this.toggleStrike = this.toggleStrike.bind(this);
  }
  handleList(){
    var listItems = this.props.todoList.map((item, i) => {
      return(
        <Grid.Row key={i}>
          <Grid.Column width={14}>
            <Checkbox checked={item.checked} label={item.name} onChange={()=>this.toggleStrike(i)} style={{textDecoration: item.strike}}/>
          </Grid.Column>
          <Grid.Column width={2}>
            <Icon name='trash' onClick={()=>this.deleteCurrent(i)} />
          </Grid.Column>
        </Grid.Row>
      );
    });
    return listItems;
  }
  toggleStrike(i){
    this.props.toggleStrikeIt(i);
  }
  deleteCurrent(i){
    this.props.deleteCurrentToDo(i);
  }
  conditionalRendering(){
    if(this.props.todoList.length == 0 ) {
      return(<center><span> Add Items to ToDo list </span></center>);
    } else {
      return(
        <Grid columns={2}>
          {this.handleList()}
        </Grid>
      );
    }
  }
  render() {
    return(
      <Segment raised style={{backgroundColor:"#F9FBE7", minHeight:"150px"}}>
        {this.conditionalRendering()}
      </Segment>
    );
  }
}
