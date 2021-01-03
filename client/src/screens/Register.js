import React, {useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure()
const Register = () => {

    const history = useHistory()
    const[name, setName]= useState("")
    const[email, setEmail]= useState("")
    const[password,setPassword]= useState("")

    const[confirmpassword,setConfirmPassword]= useState("")



    const signup = (e) => {

        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
          return toast.error("Invalid email", {position: toast.POSITION.TOP_CENTER})
        }
        if(password !== confirmpassword){
            return toast.error("Passwords dont match. Recheck password", {position: toast.POSITION.TOP_CENTER})
        }
    
        fetch("/api/v1/signup", {
          method: "post",
          headers: {
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            name:name,
            password:password,
            email:email,
          })
        }).then(res => res.json()).then(data => {
          if(data.error){
            toast.error(data.error, {position: toast.POSITION.TOP_CENTER})
          } else{
            toast.success(data.message, {position: toast.POSITION.TOP_CENTER})
            history.push('/login')
          }
        }).catch(err => {
          console.log(err)
        })
      }
    

    return (
        <div>
            <div className="container-fluid">
            <div className="row no-gutter">
                <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                <div className="col-md-8 col-lg-6">
                <div className="login d-flex align-items-center py-5">
                    <div className="container">
                    <div className="row">
                        <div className="col-md-9 col-lg-8 mx-auto">
                        <h3 className="login-heading mb-4">Register Here!</h3>
                        <form>
                            <div className="form-label-group">
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" id="inputEmail" className="form-control" placeholder="Email ID"/>
                            <label htmlFor="inputEmail">Email ID</label>
                            </div>

                            <div className="form-label-group">
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="inputName" className="form-control" placeholder="Full Name"/>
                            <label htmlFor="inputName">Full Name</label>
                            </div>

                            <div className="form-label-group">
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="inputPassword" className="form-control" placeholder="Password"/>
                            <label htmlFor="inputPassword">Password</label>
                            </div>

                            <div className="form-label-group">
                            <input value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" id="confirmPassword" className="form-control" placeholder="Confirm Password"/>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            </div>
                        
                            
                            
                        </form>
                        <button onClick={signup} id="signin__button" className="btn btn-lg btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Register</button>
                        <div className="text-center">
                            <p style={{marginTop:"10px",fontSize:"16px",fontWeight:"400"}}>
                            Already a Emplyoee?
                            <Link to={"/login"} style={{ textDecoration: "none" }}>
                            <span className="login__register"> Login here</span>
                            </Link>
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Register
