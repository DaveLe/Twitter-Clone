import React, {Component} from 'react'
import axios from "axios"
import './style.css';
import {Form,FormGroup,FormControl, Button} from 'react-bootstrap'


export default class LoginPage extends Component{
	constructor(props){
		super(props)
		this.state = {
			username:"",
			password:""

		}
	}

	handleChange = event => {
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
		axios.defaults.withCredentials = true; 
        axios.post('http://127.0.0.1:5000/auth/login', loginInfo)
            .then(res => {
             	 window.location.href="/post"
                // this.props.history.push("/post")
            })
	}

	render(){
		return(
			<div className='background'> 
			<div>
			<Form className='login'   onSubmit={this.handleSubmit}>
				<h1>
					<span className='header'>Twitter Clone </span>
				</h1>
				<h2 className='text-center'>
					Welcome
				</h2>
				<FormGroup>
					<Form.Label>Email </Form.Label>
					<FormControl type="text" placeholder="Email"  name="username"
						value = {this.state.username} onChange={this.handleChange}/>
				</FormGroup>
				<FormGroup>
					<Form.Label>Password </Form.Label>
					<FormControl type="password" placeholder="Password" name = "password" 
						value = {this.state.password} onChange={this.handleChange}/>
				</FormGroup>

				<Button type="submit" className='btn-lg btn-dark btn-block'>Log In</Button>
				
			</Form>
			</div>
			</div>
		)
		
	}
}

