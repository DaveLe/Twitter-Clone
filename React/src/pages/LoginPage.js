import React, {Component} from 'react'
import axios from "axios"


class LoginPage extends Component{
	constructor(){
		super()
		this.state = {
			username:"",
			password:""

		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event){
		const {name,value} =  event.target
		this.setState({
			[name]:value

		})
	}

	handleSubmit = event => {
		event.preventDefault();
        const loginInfo = {
            username: this.state.username,
            password: this.state.password
        };
        axios.post(window.location.origin + '/auth/login', loginInfo)
            .then(res => {
                window.location.reload();
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
				<button>Login</button>
			</form>
		)

		
	}
}

export default LoginPage