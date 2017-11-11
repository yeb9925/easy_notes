//react and react-native
import React, { Component } from 'react';
import { Actions, Router, Scene } from 'react-native-router-flux';
import { Button } from 'react-native-elements';

//components
import Home from './app/Home';
import ShowCalendar from './app/components/ShowCalendar';
import Paper from './app/components/Paper';

//react-redux
import { Provider } from 'react-redux';
import store from './app/reducers/index';

class Main extends Component {
  render() {
    return (
      <Router navigationBarStyle={{ backgroundColor: '#81b71a' }}>
        <Scene key="root">
          <Scene key="home" component={Home} title="Home" renderBackButton={()=>(null)}/>
          <Scene key="calendar" component={ShowCalendar} title="Calendar"/>
          <Scene
           key="paper"
           component={Paper} 
           title="Notes"
           onRight={() => Actions.home()}
           rightTitle="Post"
          />
        </Scene>
      </Router>
    );
  }
}

//hook up react-redux store to the main app
export default App = () => (
  <Provider store={store}>
    <Main/>
  </Provider>
);