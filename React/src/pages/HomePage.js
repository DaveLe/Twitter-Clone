import React, {Component} from 'react'
import {Link} from 'react-router-dom'



export default class HomePage extends Component{
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

