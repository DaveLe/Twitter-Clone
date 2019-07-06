import React, {Component} from 'react'
import axios from "axios";
import LoginPage from './LoginPage'
import RegistrationPage from './RegistrationPage'
import PostsPage from './PostsPage'
import NewPostPage from './NewPostPage'
import { BrowserRouter, Route, Link,Switch } from 'react-router-dom'


class HomePage extends Component{
	constructor(){
		super()
		this.state = {
			registerText: "Register",
			loggedText: "Login",
			username:""
		}
		
	}

	render(){

		return(

			<div>
				<h1>Twitter-Clone</h1>
				
				<Link to="/register">
					<button> Register</button>
				</Link>

				<Link to="/login">
					<button>Login</button>
				</Link>
			</div>
		)
	}
}

export default HomePage