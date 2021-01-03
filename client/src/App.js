import React, { useEffect, createContext, useReducer, useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { reducer, initialState } from "./reducers/userReducer.js";
import Home from "./screens/Home";
import Admin from "./screens/Admin";


export const UserContext = createContext();


const Routing = () => {
  const history = useHistory();
  const {state, dispatch} = useContext(UserContext)
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))

    if(user){
      dispatch({type:'USER',payload:user})
    }else{
      if(!history.location.pathname.startsWith("/reset")){
        history.push('/login')
      }
    }
  },[])


  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/admin">
        <Admin />
      </Route>
    </Switch>
  );
};




function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <UserContext.Provider value={{state:state, dispatch}}>
        <BrowserRouter>
          <Navbar />
          <Routing />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
