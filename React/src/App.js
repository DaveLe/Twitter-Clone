import React, {Component} from 'react';
import axios from "axios";
import HomePage from './pages/HomePage'
import { BrowserRouter, Route, Link,Switch } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import PostsPage from './pages/PostsPage'
import NewPostPage from './pages/NewPostPage'


export default class App extends Component{
  constructor(){
    super()
    this.state = {
    }
  }
  render(){
    
    return(
      <div>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/post" component={PostsPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/register" component={RegistrationPage}/>
          <Route path="/new_post" component={NewPostPage}/>
        </Switch>
      </div>
    )
  }
}
