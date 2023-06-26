import React from "react";
import {useState} from "react";
import './index.css'
import axios from "axios";
import { BiErrorCircle } from "react-icons/bi"

function SignUpForm(){


    let [cred, setCred] = useState({username : null , password : null});
    let [error,setError] = useState("");
    let [display, setDisplay] = useState({"display":"none"});

    function handleChange(e,i){

        if(i == "1"){
            setCred({...cred , username:e.target.value});
        }
        else{
            setCred({...cred , password:e.target.value});
        }
    }

    function signUp(e){
        e.preventDefault();

         axios.post("http://localhost:1000/signup",cred)
             .then(res => {
                if(res.data == true){
                    login(e); //change
                } 
                else{
                    setError(res.data);
                    setDisplay({"display" : "block" });
                }
             }) 
             .catch((err) => console.log("signup err>> ",err));   
        
    }

    return(
        <div className="auth-wrap">
            <p className="expense-tracker-p">Expense Tracker</p>

        <div className="box">
            <p className="register-login" id="register-p">Register</p>

            <form id="auth-form">
                <input className="auth-input" type="text" placeholder="username" onChange={(e)=>{handleChange(e,"1")}}></input>
                <input className="auth-input" type="text" placeholder="password" onChange={(e)=>{handleChange(e,"2")}}></input>
                <p style={display} className="message"><span className="error-logo"><BiErrorCircle/></span>{error}</p>
                <p style={display} className="message"><span className="success-logo"><BiErrorCircle/></span>{error}</p>
                <span className="button-span">
                <button className="auth-buttons" id="signup" onClick={signUp}>Sign Up</button>
                </span>
                <p id="already">already have an account? <a href="/login">login</a> instead</p>
            </form>
        </div>
        </div>
    )
}

export default SignUpForm