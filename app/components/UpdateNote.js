//react and react-native
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  Text,
  View
} from 'react-native';

//react native tools
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';

//actions
import { selectSubject } from '../reducers/subject';
import { selectDay } from '../reducers/day';

//react-redux
import { connect } from 'react-redux';

//axios
import axios from 'axios';

class UpdateNote extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Topic</Text>
        <TextInput
         onChangeText={(subject) => this.props.updateSubject(subject)}
         style={styles.textfield}
         value={this.props.subject}
         placeholder={this.props.initSubj}
        />
        <Text style={styles.titleText}>Choose Date: </Text>
        <Button 
         onPress={() => Actions.edit_calendar()} 
         title="Open Calender"
         buttonStyle={{backgroundColor: '#FFDAB9', borderRadius: 10, margin: 5}}
         textStyle={{textAlign: 'center'}}
        />
        <Button
         title="Take Notes!"
         onPress={() => Actions.edit_note({note: this.props.initNote})}
         buttonStyle={{backgroundColor: '#DEB887', borderRadius: 10, margin: 5}}
         textStyle={{textAlign: 'center'}}
        />
      </View>
    )
  }
};

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
      }
    }
  }
  
  export default connect(mapState, mapDispatch)(UpdateNote);