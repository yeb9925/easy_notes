import Main from './Main';

//react-redux
import { Provider } from 'react-redux';
import store from './app/reducers/index';

export default App = () => (
  <Provider store={store}>
    <Main/>
  </Provider>
);