import './App.css';
import Home from './pages/Home';
import Landing from './pages/Landing'
import {Switch} from 'react-router-dom'
import { GuardProvider, GuardedRoute } from 'react-router-guards';

const auth = (to, from, next) => {
  if(from.location.pathname === '/' && !localStorage.name){
    next.redirect('/landing')
  } else if(from.location.pathname === '/landing' && localStorage.name) {
    next.redirect('/')
  } else {
    next()
  }
}

function App() {

  return (
    <GuardProvider guards={auth}>
      <Switch>
        <GuardedRoute path="/landing" component={Landing} />
        <GuardedRoute path="/" exact component={Home} />
      </Switch>
    </GuardProvider>
  );
}

export default App;
