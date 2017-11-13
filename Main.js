//react and react-native
import React, { Component } from 'react';
import { Actions, Router, Scene } from 'react-native-router-flux';
import { Button } from 'react-native-elements';

//components
import Home from './app/Home';
import ShowCalendar from './app/components/ShowCalendar';
import Paper from './app/components/Paper';

//actions
import { updatedNote } from './app/reducers/note';
import { selectDay } from './app/reducers/day';
import { selectSubject } from './app/reducers/subject';

//react-redux
import { connect } from 'react-redux';
import store from './app/reducers';

//helper
import axios from 'axios';

class Main extends Component {

  constructor(props){
    super(props);
    this.state = store.getState()
  }

  render() {
    return (
      <Router navigationBarStyle={{ backgroundColor: '#FFDEAD' }}>
        <Scene key="root">
          <Scene key="home" component={Home} renderBackButton={()=>(null)}/>
          <Scene key="calendar" component={ShowCalendar} title="Calendar"/>
          <Scene
           key="paper"
           component={Paper} 
           title="Notes"
           onRight={() => {
             axios.post('https://easynotes.herokuapp.com/api', { topic: this.state.subject, date: this.state.day, note: this.state.note });
             this.props.clearState();
             Actions.home();
           }}
           rightTitle="Post"
          />
        </Scene>
      </Router>
    );
  }
}

const mapState = (state) => {
  return {};
}

const mapDispatch = dispatch => {
  return {
    clearState(){
      dispatch(selectSubject(''));
      dispatch(selectDay(''));
      dispatch(updatedNote(''));
    }
  }
}

export default connect(mapState, mapDispatch)(Main);