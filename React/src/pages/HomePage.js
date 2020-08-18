import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './style.css';



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
			<div className='background'>
				<div >
					<h1 className='header'>Twitter Clone</h1>
					
				</div>
				<hr/>
				<div className='position'>
					<Link to="/register">
						<button className='button'>Sign Up</button>
					</Link>
					<br/><br/>
					<Link to="/login">
						<button className='button' >Login</button>
					</Link>
					
				</div>
			</div>
		)
	}
}


