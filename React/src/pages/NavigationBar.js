import React from 'react'
import {Nav,Navbar,NavDropdown,Form,FormControl,Button} from 'react-bootstrap'


export default function NavigationBar(){
	return(
		<Navbar bg="light" expand="lg">
		  <Navbar.Brand className='split' href="/">Twitter-Clone</Navbar.Brand>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
		  <Navbar.Collapse id="basic-navbar-nav">
		    <Nav className="mr-auto">
		      <Nav.Link href="/">Home</Nav.Link>
		      <Nav.Link href="/">Posts</Nav.Link>
		      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
		        <NavDropdown.Item href="profile/:id">Profile</NavDropdown.Item>
		        <NavDropdown.Item href="settings">Settings</NavDropdown.Item>
		        <NavDropdown.Item href="/">Sign out</NavDropdown.Item>
		        <NavDropdown.Divider />
		        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
		      </NavDropdown>
		    </Nav>
		    <Form inline>
		      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
		      <Button variant="outline-success">Search</Button>
		    </Form>
		  </Navbar.Collapse>
		</Navbar>
	)
}