//react and react-native
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';

//actions
import { selectSubject } from '../app/reducers/subject';
import { selectDay } from '../app/reducers/day';
import { updatedNote } from '../app/reducers/note';

//react-redux
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <View style={styles.container}>
        <Button 
         onPress={() => Actions.note_calendar()} 
         title="See Notes"
         buttonStyle={{backgroundColor: '#DEB887', borderRadius: 10, margin: 5}}
         textStyle={{textAlign: 'center'}}
        />
        <Text style={styles.titleText}>Topic</Text>
        <TextInput
         onChangeText={(subject) => this.props.updateSubject(subject)}
         style={styles.textfield}
         value={this.props.subject}
        />
        <Text style={styles.titleText}>Choose Date: </Text>
        <Button 
         onPress={() => Actions.calendar()} 
         title="Open Calender"
         buttonStyle={{backgroundColor: '#FFDAB9', borderRadius: 10, margin: 5}}
         textStyle={{textAlign: 'center'}}
        />
        <Button
         title="Take Notes!"
         onPress={() => Actions.paper()}
         buttonStyle={{backgroundColor: '#DEB887', borderRadius: 10, margin: 5}}
         textStyle={{textAlign: 'center'}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFAF0',
  },
  titleText: {
    fontFamily: 'Cochin',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  textfield: {
    height: 40,
    width: 250,
    textAlign: 'center'
  }
});

const mapState = (state) => {
  return {
    subject: state.subject
  };
}
const mapDispatch = dispatch => {
  return {
    updateSubject(subject){
      dispatch(selectSubject(subject));
    },
    clearState(){
      dispatch(selectSubject(''));
      dispatch(selectDay(''));
      dispatch(updatedNote(''));
    }
  }
}

export default connect(mapState, mapDispatch)(Home);