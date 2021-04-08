import './App.css';
import Home from './pages/Home';
import Landing from './pages/Landing'
import {Route, Switch, useLocation} from 'react-router-dom'
import { useEffect } from 'react';

function App() {
  const location = useLocation()

  console.log(location)
  return (
    <Switch>
      <Route path="/landing">
        <Landing />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
