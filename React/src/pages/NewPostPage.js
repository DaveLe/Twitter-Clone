import React, {Component} from 'react'
import axios from "axios"

export default class NewPostPage extends Component{
	state = {
		title:"",
		body:""
	}


	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value 
		})
	}

	handleSubmit = event => {
		event.preventDefault();

	    const postInfo = {
	        title: this.state.title,
	       	body : this.state.body
	    };

	    
		axios.post('http://127.0.0.1:5000/create', postInfo)
	        .then(res => {
				window.location.href="/post"
				console.log(res)
	        })
	        .catch(err => {
	            console.log(err.response);
	        })
	
	}

	render(){

		return(
			<form onSubmit={this.handleSubmit}>
				<hr/>
				Title
				<br/>
				<textarea  
					cols="50" 
					name = "title" 
					value = {this.state.title}
					onChange={this.handleChange}
				/>

				<br/>
				body
				<br/>
				<textarea 
					rows="10" 
					cols="50"
					name = "body" 
					value = {this.state.body}
					onChange={this.handleChange}
				/>	
				<button>Post</button>

			</form>



		)
	}
}