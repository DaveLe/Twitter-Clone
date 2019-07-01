import React, {Component} from 'react'
import axios from "axios";
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'

class HomePage extends Component{
	constructor(){
		super()
		this.state = {
			isLoggedClicked: false,
			isRegisterClicked:false,
			username: "David"

			
		}
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(){
		this.setState(prevState => {
			return{
				isLoggedClicked : !prevState.isLoggedClicked
			}
		})
	}
	render(){
		let isLoggedInText = this.state.isLoggedClicked ? this.state.username : "Register"
		let loggedInOrOut = this.state.isLoggedClicked? "Log Out" : "Log In"

		return(

			<div>
				<h1>Twitter-Clone</h1>
				<button onClick = {this.handleClick}> {isLoggedInText} </button>
				<button onClick = {this.handleClick}> {loggedInOrOut} </button>

				<h1>Posts</h1>
			</div>
		)


	}

}

export default HomePage