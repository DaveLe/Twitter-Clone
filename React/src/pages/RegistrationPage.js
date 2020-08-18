import React, {Component} from 'react'
import axios from "axios"
import './style.css';
import {Form,FormGroup,FormControl, Button} from 'react-bootstrap'

export default class RegistrationPage extends Component{
	state = {
		username: "",
		password: "",
		name: ""
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
			name: this.state.name,
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
			
			<div className='background'> 
				<div>
					<Form className='login' onSubmit={this.handleSubmit}>
						<h1>
							<span className='header'>Twitter Clone </span>
						</h1>
						
						<FormGroup>
							<Form.Label>Email </Form.Label>
							<FormControl type="email" placeholder="Email"  name="username"
								value = {this.state.username} onChange={this.handleChange}/>
						</FormGroup>

						<FormGroup>
							<Form.Label>Name </Form.Label>
							<FormControl type="text" placeholder="Name"  name="name"
								value = {this.state.name} onChange={this.handleChange}/>
						</FormGroup>

						<FormGroup>
							<Form.Label>Password </Form.Label>
							<FormControl type="password" placeholder="Password" name = "password" 
								value = {this.state.password} onChange={this.handleChange}/>
						</FormGroup>

						<Button type="submit" className='btn-lg btn-dark btn-block'>Sign up</Button>
						
					</Form>
				</div>
			</div>
		)

		
	}
}
