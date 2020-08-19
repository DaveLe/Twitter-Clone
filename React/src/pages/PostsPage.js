import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from "axios"


export default class PostsPage extends Component{
	constructor(){
		super()
		this.state ={
			posts:[],
			username:"",
			user_id: "",
			post_id: ""
		}	
		
	}
	handleLogout = event =>{
		axios.get('http://127.0.0.1:5000/auth/logout')
      		.then(res => {
      			window.location.href="/"

      		});
	}

	handleDelete = event =>{
		this.setState({
			[event.target.name]: event.target.value 
		})
		const deleteInfo = {
	        id:event.target.value
	    };

		axios.post('http://127.0.0.1:5000/delete', deleteInfo)
      		.then(res => {
      			window.location.href="/post"

      		});
	}

	componentDidMount() {
		axios.defaults.withCredentials = true;
		axios.get('http://127.0.0.1:5000/auth/session')
	      	.then(res => {
	      			console.log(res)
	      			this.setState({username: res.data[0]});
	      			this.setState({user_id: res.data[1]});


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
				
				<div className='navbar'>
					
					
					<h1 className='smallerheader'>Twitter Clone</h1>
					<div>
						<Link to="/">
							<button className='navbarbutton'>
								Home
							</button>
						</Link>

					</div>	

					<div>
						<Link to="/">
							<button className='navbarbutton'>
								Followers
							</button>
						</Link>

					</div>	

					<div>
						<Link to="/">
							<button className='navbarbutton'>
								Following
							</button>
						</Link>

					</div>	

					<div>
						<Link to="/">
							<button className='navbarbutton'>
								Likes
							</button>
						</Link>

					</div>	

					<div>
						<Link to="/">
							<button className='navbarbutton'>
								Profile
							</button>
						</Link>

					</div>	
					
					<button onClick={this.handleLogout}>Logout</button>
							
				</div>

				<div className='homepage'>
					<h1>Hello, {this.state.username}</h1>
					
					<form onSubmit={this.handleSubmit}>

						<br/>
						<textarea className='content'
							rows="10" 
							cols="50"
							name = "content" 
							value = {this.state.content}
							onChange={this.handleChange}
						/>
						<br/>	
						<button className='btn-lg btn-dark'>Post</button>

					</form>
					{/* {this.state.username} */}
					<h1>Posts</h1>
					
					

					{this.state.posts.map(post => (
							<p key={post._id.$oid}>
								{/* Title: {post.title} <br/> */}
								Username: {post.userinfo.username} <br/>
								{this.state.username === post.userinfo.username ? 
									"This is your message" 
									: null
								}
							
								Body: {post.content} <br/>
								{this.state.username === post.userinfo.username ? 
									<button name = "post_id" value = {post._id.$oid} onClick={this.handleDelete}>Delete</button>
									: null
								}
							</p>		
						))}

					<br/>
					</div>
			</div>

		)
	}
}