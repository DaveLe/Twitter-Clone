import React, {Component} from 'react'


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
	    // Go back to home page after posting your new post
	    // axios.post(window.location.origin + '/auth/register', postInfo)
     //    .then(res => {
     //    	console.log(res)
     //        window.location.reload();
     //    })
     //    .catch(err => {
     //        console.log(err);
     //    })
    
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