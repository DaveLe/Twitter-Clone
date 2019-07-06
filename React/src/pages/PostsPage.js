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
		// axios.get('http://127.0.0.1:5000/auth/')
  //     		.then(res => {

  //     			// console.log(res);
  //     			this.setState({posts: res.data});
  //     		});
	}


	componentDidMount() {
		axios.defaults.withCredentials = true;
		axios.get('http://127.0.0.1:5000/auth/session')
	      	.then(res => {
	      			console.log(res.data)
	      			this.setState({username: res.data});
	      		});

	    axios.get('http://127.0.0.1:5000/')
      		.then(res => {

      			// console.log(res);
      			this.setState({posts: res.data});
      		});

      	
    }
    

    //I also have to get the usename used on the login page
    //<button OnClick={handleLogout}>Logout</button>
	render(){
		return(
			<div>
				<h1>Hello, {this.state.username}</h1>
				<HomeButton />
				
				<h1>Posts</h1>
				<Link to="/new_post">
					<li>New Post</li>
				</Link>
				{this.state.posts.map(post => (
					<div>
						<li key={post._id.$oid}>Title: {post.title}</li>
						<li>Username: {post.userinfo.username}</li>
						{/*<Link to">	
							<li>Edit</li>
						<Link/>
					*/}
						<li>Edit?</li>
						<li>Body: {post.body}</li>
						<br/>
					</div>
					))}

				<br/>
				


			</div>
		)
	}
}