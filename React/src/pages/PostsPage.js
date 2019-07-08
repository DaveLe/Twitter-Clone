import React, {Component} from 'react'
import axios from "axios"
import { BrowserRouter, Route, Link } from 'react-router-dom'
import HomeButton from './HomeButton'

/*
	Should only see New if you are logged in

*/
export default class PostsPage extends Component{
	constructor(){
		super()
		this.state ={
			posts:[],
			username:""
		}	
		this.handleLogout = this.handleLogout.bind(this)
	}
	handleLogout(){
		axios.get('http://127.0.0.1:5000/auth/logout',{withCredentials:true})
      		.then(res => {
      			window.location.href="/"

      		});
	}


	componentDidMount() {
		// axios.defaults.withCredentials = true;
		axios.get('http://127.0.0.1:5000/auth/session',{withCredentials:true})
	      	.then(res => {
	      			console.log(res.data)
	      			this.setState({username: res.data});
	      		});

	    axios.get('http://127.0.0.1:5000/')
      		.then(res => {

      			console.log(res);
      			this.setState({posts: res.data});
      		});

      	
    }
    

	render(){
		
		return(
			<div>
				<h1>Hello, {this.state.username}</h1>
				<HomeButton />
				<button onClick={this.handleLogout}>Logout</button>
				
				<h1>Posts</h1>
				{this.state.username === "" ? null :
					<Link to="/new_post">
						<li>New Post</li>
					</Link>
				}

				{this.state.posts.map(post => (
					<div>
						<p key={post._id.$oid}>
							Title: {post.title} <br/>
							Username: {post.userinfo.username} <br/>
							{this.state.username === post.userinfo.username ? 
								<Link to="edit_page">
									Edit <br/>
								</Link> 
								: null
							}
							Body: {post.body} <br/>
						</p>
					</div>
					))}

				<br/>
				
			</div>
		)
	}
}