import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import App from './App';
import Result from './components/Result'


const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path= '/result' component = {Result}/>
        <Route  path= '/' component = {App}/>
      </Switch>
    </Router>
  )};
  export default Root
