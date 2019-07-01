import React, {Component} from 'react'
import axios from "axios"

export default class RegistrationPage extends Component{
	// constructor(){
	// 	super()
	// 	this.state = {
	// 		username:"",
	// 		password:""

	// 	}
	// 	this.handleChange = this.handleChange.bind(this)
	// 	this.handleSubmit = this.handleSubmit.bind(this)
	// }
	state = {
		username: ""
		password: ""
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value 
		})
	}

	handleSubmit = event => {
		event.preventDefault();

	    const registerInfo = {
	        username: this.state.username
	        password: this.state.password
	    };
	    // flask link 'http://127.0.0.1:5000/', 
	    axios.post(window.location.origin + '/auth/register', registerInfo)
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })
    
	}

	render(){

		return(
			<form onSubmit={this.handleSubmit}>
				<input 
					type="text" 
					name = "username" 
					value = {this.state.username}
					placeholder="Username" 
					onChange={this.handleChange}
				/>
				<h1>{this.state.username}</h1>

				<input 
				type="password" 
				name = "password" 
				value = {this.state.password}
				placeholder="Password" 
				onChange={this.handleChange}
				/>
				<h1>{this.state.password}</h1>
				<button>Register</button>
			</form>
		)

		
	}
}
