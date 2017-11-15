//react and react-native
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TextInput
} from 'react-native';

//actions
import { updatedNote } from '../reducers/note';

//react-redux
import { connect } from 'react-redux';

class EditContent extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <View style={styles.container}>
        <TextInput 
         onChangeText={(notes) => this.props.updateNote(notes)}
         value={this.props.content}
         underlineColorAndroid='transparent'
         multiline={true} 
         autoFocus={true}
         autoGrow={true}
         />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  }
});

const mapState = (state) => {
  return {
    content: state.note
  };
}
const mapDispatch = dispatch => {
  return {
    updateNote(note){
        dispatch(updatedNote(note))
    }
  }
}

export default connect(mapState, mapDispatch)(EditContent);