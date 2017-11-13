//react and react-native
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

//main component
import Main from './Main';

//react-redux
import { Provider } from 'react-redux';
import store from './app/reducers/index';

AppRegistry.registerComponent('take_notes', () => () => 
    (
      <Provider store={store}>
        <Main/>
      </Provider>
    )
);
