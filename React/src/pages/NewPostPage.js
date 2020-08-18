import React, {Component} from 'react'
import axios from "axios"

export default class NewPostPage extends Component{
	state = {
		
		content:""
	}


	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value 
		})
	}

	handleSubmit = event => {
		event.preventDefault();

	    const postInfo = {
	        
	       	content : this.state.content
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

				<br/>
				<textarea 
					rows="10" 
					cols="50"
					name = "content" 
					value = {this.state.content}
					onChange={this.handleChange}
				/>	
				<button>Post</button>

			</form>



		)
	}
}