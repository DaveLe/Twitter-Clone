import React from 'react'
import {Route,Link} from 'react-router-dom'
import HomePage from './HomePage'


function HomeButton(){
	return(
		<div>
			<Link to="/">
				<button>
					Home
				</button>
			</Link>

		</div>
	)
}
export default HomeButton