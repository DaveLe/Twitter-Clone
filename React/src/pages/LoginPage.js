import React, {Component} from 'react'
import axios from "axios"
import PostsPage from './PostsPage'


class LoginPage extends Component{
	constructor(props){
		super(props)
		this.state = {
			username:"",
			password:"",
			user:[]

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
            	// console.log(res)
            	console.log(res.data)
            	// setCookies(username,re)
             	 window.location.href="/post"
                // this.props.history.push("/post")
            })
	}

	render(){

		return(
			<div>


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
			</div>
		)

		
	}
}

export default LoginPage