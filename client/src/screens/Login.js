import React, {useState, useContext} from 'react';
import './Login.css';
import {Link, useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {UserContext} from '../App'


toast.configure()
const Login = () => {


    const {state, dispatch} = useContext(UserContext)

  const history = useHistory()
  const[empid, setEmpId]= useState("")
  const[password,setPassword]= useState("")


    const signin = () => {

      fetch("/api/v1/signin", {
        method: "post",
        headers: {
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          password:password,
          employee_id:empid
        })
      }).then(res => res.json()).then(data => {
        //console.log(data)
        if(data.error){
          toast.error(data.error, {position: toast.POSITION.TOP_CENTER})
        } else{
          /////////
          localStorage.setItem('jwt', data.token)
          localStorage.setItem("user", JSON.stringify(data.user))
          /////////
          dispatch({type: "USER", payload:data.user})

          toast.success("Signed in successfully", {position: toast.POSITION.TOP_CENTER})
          history.push('/')
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
                        <h3 className="login-heading mb-4">Welcome back!</h3>
                        <form>

                            <div className="form-label-group">
                            <input value={empid} onChange={(e) => setEmpId(e.target.value)} type="text" id="inputEmpId" className="form-control" placeholder="Employee ID"/>
                            <label htmlFor="inputEmpId">Employee ID</label>
                            </div>

                            <div className="form-label-group">
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="inputPassword" className="form-control" placeholder="Password"/>
                            <label htmlFor="inputPassword">Password</label>
                            </div>
                    
                        </form>

                            <button onClick={signin} id="signin__button" className="btn btn-lg btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Sign in</button>
                            <div className="text-center">
                            <a className="small" href="#">Forgot password?</a>
                            <p style={{marginTop:"10px",fontSize:"16px",fontWeight:"400"}}>
                            New Emplyoee?
                            <Link to={"/register"} style={{ textDecoration: "none" }}>
                            <span className="login__register"> Register here</span>
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

export default Login
