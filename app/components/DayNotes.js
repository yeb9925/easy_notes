//react and react-native
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

//react native tools
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';

import { connect } from 'react-redux';

//actions
import { selectSubject } from '../reducers/subject';
import { selectDay } from '../reducers/day';
import { updatedNote } from '../reducers/note';
import { updatedNoteId } from '../reducers/id';

//axios
import axios from 'axios';

class DayNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
        notes: []
    }
  }

  componentDidMount(){
    axios.get(`https://easynotes.herokuapp.com/api/${this.props.chosen_day}`)
      .then(res => res.data)
      .then(notes => this.setState({ notes }));
  }

  render(){
    const allNotes = this.state.notes;

    return (
      <View style={styles.container}>
        {
          allNotes.map(note => (
            <View key={note._id} style={styles.note}>
              <View>
                <Text style={styles.text}>{note.topic}</Text>
                <Text style={styles.text}>{note.date}</Text>
                <Text style={styles.text}>{note.content}</Text>
              </View>
              <Button
               title="Edit"
               buttonStyle={{backgroundColor: '#DEB887', borderRadius: 10, margin: 3}}
               textStyle={{textAlign: 'center'}}
               onPress={()=>{
                 this.props.updateEditState(note.topic, note.date, note.content, note._id);
                 Actions.update_note({initSubj: note.topic});
               }}
              />
              <Button
               title="Delete"
               buttonStyle={{backgroundColor: '#DEB887', borderRadius: 10, margin: 3}}
               textStyle={{textAlign: 'center'}}
               onPress={() => {
                 const newState = this.state.notes.filter(_note => _note._id !== note._id);
                 this.setState({ notes: newState});
      
                 axios.delete(`https://easynotes.herokuapp.com/api/${note._id}`);
               }}
              />
            </View>
          ))
        }
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#FFFAF0'
  },
  note: {
    borderRadius: 4,
    borderWidth: 1.5,
    alignSelf: 'stretch',
    borderColor: '#DEB887',
  },
  text: {
    fontWeight: 'bold'
  }
});

const mapState = (state) => {
  return {};
}

const mapDispatch = (dispatch) => {
  return {
    updateEditState(subject, date, content, id){
      dispatch(selectSubject(subject));
      dispatch(selectDay(date));
      dispatch(updatedNote(content));
      dispatch(updatedNoteId(id));
    },
  };
}

export default connect(mapState, mapDispatch)(DayNotes)