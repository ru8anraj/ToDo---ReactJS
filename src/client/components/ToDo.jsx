import React from 'react';
import { Segment, Input, Button, TransitionablePortal, Message } from 'semantic-ui-react';
import AppBar from './AppBar.jsx';
import AddToDo from './AddToDo.jsx';
import ListToDo from './ListToDo.jsx';


export default class ToDo extends React.Component{
  constructor(){
    super();
    this.state = {
      todoList : [
        { name: 'React', checked: false, strike: 'none' },
        { name: 'Node', checked: false, strike: 'none' },
        { name: 'Express', checked: false, strike: 'none' }
      ],
      openSnack: false,
      snackMsg: '',
      markAll: 'complete'
    };
    this.handleNewToDo = this.handleNewToDo.bind(this);
    this.toggleStrikeIt = this.toggleStrikeIt.bind(this);
    this.handleClearFinished = this.handleClearFinished.bind(this);
    this.deleteCurrentToDo = this.deleteCurrentToDo.bind(this);
    this.handleMarkAll = this.handleMarkAll.bind(this);
  }

  timeOutSnackBar(){
    setTimeout(() => {
      this.setState({openSnack: false, snackMsg: ''});
    }, 1000);
  }

  handleNewToDo(value){
    var { todoList } = this.state;
    var obj = { name: value, checked: false, strike: 'none' };
    todoList.unshift(obj);
    this.setState({todoList: todoList});
  }

  toggleStrikeIt(i){
    var { todoList } = this.state;
    if (todoList[i].checked) {
      todoList[i].checked = false;
      todoList[i].strike = 'none';
      this.setState({openSnack: true, snackMsg: 'Task marked as incomplete'});
      this.timeOutSnackBar();
    } else {
      todoList[i].checked = true;
      todoList[i].strike = 'line-through';
      this.setState({openSnack: true, snackMsg: 'Task marked as complete'});
      this.timeOutSnackBar();
    }
    this.setState({todoList: todoList});
  }

  deleteCurrentToDo(i){
    var { todoList } = this.state;
    if (todoList[i].checked) {
      todoList.splice(i, 1);
    } else {
      this.setState({openSnack: true, snackMsg: 'Task not checked yet!'});
      this.timeOutSnackBar();
    }
    this.setState({todoList: todoList});
  }

  handleClearFinished(){
    var { todoList } = this.state;
    todoList = todoList.filter((item) => {
      return !item.checked;
    });
    this.setState({todoList: todoList});
  }

  handleMarkAll(){
    var { todoList } = this.state;
    var { markAll } = this.state;
    if (this.state.markAll == 'complete') {
      for (var i = 0; i < todoList.length; i++) {
        todoList[i].checked = true;
        todoList[i].strike = 'line-through';
      }
      markAll = 'incomplete';
      this.setState({
        todoList: todoList,
        markAll: markAll,
        openSnack: true,
        snackMsg: 'All tasks marked as complete'
      });
      this.timeOutSnackBar();
    } else {
      for (var i = 0; i < todoList.length; i++) {
        todoList[i].checked = false;
        todoList[i].strike = 'none';
      }
      markAll = 'complete';
      this.setState({
        todoList: todoList,
        markAll: markAll,
        openSnack: true,
        snackMsg: 'All tasks marked as incomplete'
      });
      this.timeOutSnackBar();
    }
  }

  render(){
    return(
      <div>
        <AppBar />
        <Segment raised className='ToDo-Card'>
          <center>
            <AddToDo handleNewToDo={this.handleNewToDo} />
          </center>
          <br />
          <center>
            <Button onClick={this.handleMarkAll}>
              <span> Mark all as {this.state.markAll} </span>
            </Button>
          </center>
          <ListToDo
            todoList={this.state.todoList}
            toggleStrikeIt={this.toggleStrikeIt}
            deleteCurrentToDo={this.deleteCurrentToDo}
          />
          <center>
            <Button onClick={this.handleClearFinished}>Clear Finished</Button>
          </center>
        </Segment>
        <TransitionablePortal className='snackbar' open={this.state.openSnack} transition={{ animation:'swing up', duration: '100'}}>
          <span>{this.state.snackMsg}</span>
        </TransitionablePortal>
      </div>
    );

  }
}
