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

import { connect } from 'react-redux';

//helper
import axios from 'axios';

class Main extends Component {

  constructor(props){
    super(props);
  }

  render() {
    console.log(this.props)
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
             axios.post('/api', { topic: this.props.subject, date: this.props.day, note: this.props.note });
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
  return {
    subject: state.subject,
    day: state.day,
    note: state.note
  };
}

const mapDispatch = dispatch => {
  return {
    clearState(){
      dispatch(selecSubject(''));
      dispatch(selectDay(''));
      dispatch(updatedNote(''));
    }
  }
}

export default connect(mapState, mapDispatch)(Main);
