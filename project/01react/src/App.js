import './App.css';
import ReduxPage from './pages/reduxPage';
import {Provider} from 'react-redux'
import store from './store'
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ReduxPage></ReduxPage>
      </div>
    </Provider>
  );
}

export default App;
