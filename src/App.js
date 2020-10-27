import logo from './logo.svg';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Manager from './Manager'
import './App.css';
import './snackbar.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Manager}></Route>
      </Switch>
      </BrowserRouter>
      <div id='snackbar'></div>
    </div>
  );
}

export default App;
