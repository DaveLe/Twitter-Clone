import React, {Component} from 'react'
import axios from "axios"
import { BrowserRouter, Route, Link } from 'react-router-dom'

/*
	Should only see New if you are logged in

*/
export default class PostsPage extends Component{

	constructor(){
		super()
		this.state ={
			posts:[]
		}

		
	}
	

	componentDidMount() {
	    // axios.get('http://127.0.0.1:5000/')
	    //   .then(res => {
	    //     const posts = res.data;
	    //     this.setState({ posts });

	    // })

	    axios.get('http://127.0.0.1:5000/')
      		.then(res => {
      			console.log(res);
      			this.setState({posts: res.data});
      		});

      	// fetch('http://127.0.0.1:5000/')
	    // 	.then(response => response.json())
	    // 	.then(data => this.setState({ posts: data.posts}))

    	// console.log(this.state.posts)
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

				{this.state.posts.map(post => (
					<div>
						<li key={post._id.$oid}>{post.title}</li>
						<li>{post.userinfo.username}</li>
						{/*<Link to">	
							<li>Edit</li>
						<Link/>
					*/}
						<li>{post.body}</li>
						<br/>
					</div>
					))}



			</div>
		)
	}
}