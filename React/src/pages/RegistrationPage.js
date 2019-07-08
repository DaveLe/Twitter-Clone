import React, {Component} from 'react'
import axios from "axios"

export default class RegistrationPage extends Component{
	state = {
		username: "",
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
	        username: this.state.username,
	        password: this.state.password
	    };
	    // flask link 'http://127.0.0.1:5000/', 
	    axios.post('http://127.0.0.1:5000/auth/register',registerInfo)
        .then(res => {
			window.location.reload();
			console.log(res)
        })
        .catch(err => {
            console.log(err.response);
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
			

				<input 
					type="password" 
					name = "password" 
					value = {this.state.password}
					placeholder="Password" 
					onChange={this.handleChange}
				/>
				
				<button>Submit</button>
			</form>
		)

		
	}
}