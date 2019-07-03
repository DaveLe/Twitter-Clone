import React, {Component} from 'react'
import axios from "axios"


class LoginPage extends Component{
	constructor(props){
		super(props)
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

        axios.post('http://127.0.0.1:5000/auth/login', loginInfo)
            .then(res => {
            	//login should now be logout(login/logout ternary)
            	//register should now be name (register/name ternary)
            	//new should now appear(am i logged in or not ternary)
            	//edit should now appear (am i logged in or not ternary)
          		
                window.location.href="/"
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
				
				<button>Login</button>
			</form>
		)

		
	}
}

export default LoginPage