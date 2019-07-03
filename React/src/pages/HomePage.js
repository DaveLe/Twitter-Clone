import React, {Component} from 'react'
import axios from "axios";
import LoginPage from './LoginPage'
import RegistrationPage from './RegistrationPage'
import PostsPage from './PostsPage'
import NewPostPage from './NewPostPage'
import { BrowserRouter, Route, Link } from 'react-router-dom'


class HomePage extends Component{
	constructor(){
		super()
		this.state = {
			// isLoggedClicked: false,
			// isRegisterClicked:false,
			registerText: "Register",
			loggedText: "Login"

			
		}
		// this.handleLogClick = this.handleLogClick.bind(this)
		// this.handleRegistrationClick = this.handleRegistrationClick.bind(this)
	}

	
	render(){
		// let registerText = this.state.isRegisterClicked ? <RegistrationPage /> : "Register"
		// let loggedText = this.state.isLoggedClicked? "Log Out" : "Log In"

		return(

			<div>
				<Link to="/">
					<button>
						Home
					</button>
				</Link>

				<h1>Twitter-Clone</h1>


				<Link to="/register">
					<button 
						// name = "isRegisterClicked" 
						// value = {this.state.isRegisterClicked}
						> 
					{this.state.registerText}
					</button>
				</Link>

				<Link to="/login">
					<button 
						// name = "isLoggedClicked" 
						// value = {this.state.isLoggedClicked}> 
						>
					{this.state.loggedText}
					</button>
				</Link>




				<Route path="/" exact component={PostsPage}/>
				<Route path="/login" component={LoginPage}/>
				<Route path="/register" component={RegistrationPage}/>
				<Route path="/new_post" component={NewPostPage}/>

			</div>
		)


	}

}

export default HomePage