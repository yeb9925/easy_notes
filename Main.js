//react and react-native
import React, { Component } from 'react';
import { Actions, Router, Scene } from 'react-native-router-flux';
import { Button } from 'react-native-elements';

//components
import Home from './app/Home';
import ShowCalendar from './app/components/ShowCalendar';
import NoteCalendar from './app/components/NoteCalendar';
import EditCalendar from './app/components/EditCalendar';
import DayNotes from './app/components/DayNotes';
import UpdateNote from './app/components/UpdateNote';
import EditContent from './app/components/EditContent';
import Paper from './app/components/Paper';

//actions
import { updatedNote, getNoteState } from './app/reducers/note';
import { selectDay, getDayState } from './app/reducers/day';
import { selectSubject, getSubjectState } from './app/reducers/subject';
import { getNoteIdState } from './app/reducers/id';

//react-redux
import { connect } from 'react-redux';
import store from './app/reducers';

//helper
import axios from 'axios';

class Main extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <Router navigationBarStyle={{ backgroundColor: '#FFDEAD' }}>
        <Scene key="root">
          <Scene key="home" component={Home} renderBackButton={()=>(null)}/>
          <Scene key="calendar" component={ShowCalendar} title="Calendar"/>
          <Scene key="note_calendar" component={NoteCalendar} title="Choose Date"/>
          <Scene key="edit_calendar" component={EditCalendar}/>
          <Scene 
           key="date_notes" 
           component={DayNotes} 
           title="Notes"
          />
          <Scene key="update_note" component={UpdateNote} title="Edit Note"/>
          <Scene
           key="paper"
           component={Paper} 
           title="Notes"
           onRight={() => {
             let info = this.props.retrieveState();
             axios.post('https://easynotes.herokuapp.com/api', { topic: info.subject, date: info.date, content: info.note });
             this.props.clearState();
             Actions.home();
           }}
           rightTitle="Done"
          />
          <Scene
           key="edit_note"
           component={EditContent} 
           title="Edit Note"
           onRight={() => {
             let info = this.props.retrieveState();
             axios.put(`https://easynotes.herokuapp.com/api/${info.id}`, { topic: info.subject, date: info.date, content: info.note });
             this.props.clearState();
             Actions.home();
           }}
           rightTitle="Done"
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
    },
    retrieveState(){
      let subject = getSubjectState();
      let date = getDayState();
      let note = getNoteState();
      let id = getNoteIdState();

      return { subject, date, note, id };
    }
  }
}

export default connect(mapState, mapDispatch)(Main);