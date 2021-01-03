import "./Navbar.css";
import React, {useContext} from "react";
import * as ReactBootstrap from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import {UserContext} from "../App"


const Navbar = () => {


    const history = useHistory();
    const {state, dispatch} = useContext(UserContext);
  

    const renderList = () => {
        if(state){
          return [

              <ReactBootstrap.Nav.Link key="1" id="nav__links" href="#"><Link to="/" style={{textDecoration: "none", color: "inherit"}}>HOME</Link></ReactBootstrap.Nav.Link>,
              <ReactBootstrap.Nav.Link key="2" id="nav__links" href="#"><Link to="/" style={{textDecoration: "none", color: "inherit"}}>ABOUT</Link></ReactBootstrap.Nav.Link>,
              <ReactBootstrap.Nav.Link key="3" id="nav__links" href="#"><Link to="/" style={{textDecoration: "none", color: "inherit"}}>CAREERS</Link></ReactBootstrap.Nav.Link>,
              <ReactBootstrap.Nav.Link key="4" id="nav__links" href="#"><Link to="/" style={{textDecoration: "none", color: "inherit"}}>CONTACT US</Link></ReactBootstrap.Nav.Link>,
              <ReactBootstrap.Nav.Link key="5" id="nav__links" href="#"><Link to="/admin" style={{fontWeight:"600",textDecoration: "none", color: "inherit"}}>ADMIN</Link></ReactBootstrap.Nav.Link>,
              

              <ReactBootstrap.Nav.Link key="6" href="#" id="nav__links" className="nav__logout">
                <ReactBootstrap.Button className="logout__button" onClick={() =>{
                  localStorage.clear()
                  dispatch({type:"LOGOUT"})
                  history.push('/login')
                }} >LOGOUT</ReactBootstrap.Button>
              </ReactBootstrap.Nav.Link>
          ]
        }else {
          return [
                <ReactBootstrap.Nav.Link key="1" id="nav__links" href="#"><Link to="/" style={{textDecoration: "none", color: "inherit"}}>HOME</Link></ReactBootstrap.Nav.Link>,
                <ReactBootstrap.Nav.Link key="2" id="nav__links" href="#"><Link to="/" style={{textDecoration: "none", color: "inherit"}}>ABOUT</Link></ReactBootstrap.Nav.Link>,
                <ReactBootstrap.Nav.Link key="3" id="nav__links" href="#"><Link to="/" style={{textDecoration: "none", color: "inherit"}}>CAREERS</Link></ReactBootstrap.Nav.Link>,
                <ReactBootstrap.Nav.Link key="10" id="nav__links" href="#"><Link to="/login" style={{textDecoration: "none", color: "inherit"}}>LOGIN</Link></ReactBootstrap.Nav.Link>,
                <ReactBootstrap.Nav.Link key="4" style={{fontWeight:"600"}} id="nav__links" href="#"><Link to="/" style={{textDecoration: "none", color: "inherit"}}>CONTACT US</Link></ReactBootstrap.Nav.Link>,
          ]
        }
      }
    


    return (
        <div className="header__main">
            <ReactBootstrap.Navbar id="nav__bar" collapseOnSelect expand="lg" style={{backgroundColor:"white"}}>
                <ReactBootstrap.Navbar.Brand href="#"><img id="nav__brand" style={{height:"82px",backgroundColor:"white"}} src="https://alfaleus.in/Assets/AlfaleusLogo.png" alt=""/></ReactBootstrap.Navbar.Brand>
                <ReactBootstrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <ReactBootstrap.Navbar.Collapse style={{backgroundColor:"white"}} id="responsive-navbar-nav">
                    <ReactBootstrap.Nav style={{backgroundColor:"rgba(0,0,0,0)"}} className="mr-auto">
                    </ReactBootstrap.Nav>
                    <ReactBootstrap.Nav style={{backgroundColor:"white"}}>

                        {renderList()}
                        
                    </ReactBootstrap.Nav>
                </ReactBootstrap.Navbar.Collapse>
            </ReactBootstrap.Navbar>
        </div>
    )
}

export default Navbar
