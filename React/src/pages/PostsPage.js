import React, {Component} from 'react'
import axios from "axios"
import { BrowserRouter, Route, Link } from 'react-router-dom'

/*
	Should only see New if you are logged in

*/
export default class PostsPage extends Component{
	state ={

	}


	render(){
		return(
			<div>
				<h1>Posts</h1>
				<Link to="/new_post">
					<li>New</li>
				</Link>

				<h2>Example post</h2>
				<br/>Title
				<br/>by username
				<br/>Clickable Edit only if username id and posts author id match
				<br/>body

			</div>
		)
	}
}