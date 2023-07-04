import React from "react";
import {useState} from "react";
import './index.css'
import axios from "axios";
import { BiErrorCircle } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import { be_url } from './config';

let url = be_url;

function SignUpForm(){


    console.log(window.location.href)


    let [cred, setCred] = useState({username : null , password : null});
    let [message,setMessage] = useState("");
    let [errorDisplay, setErrorDisplay] = useState({"display":"none"});
    let [successDisplay, setSuccessDisplay] = useState({"display":"none"});


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

         axios.post(url + "/signup",cred)
             .then(res => {

                setMessage(res.data.message);
                if(res.data.code == "1"){
                    setErrorDisplay({display : "block"});
                    setSuccessDisplay({display : "none"});

                    
                } 
                else{
                    setErrorDisplay({display : "none"});
                    setSuccessDisplay({display : "block"});
                }
             }) 
             .catch((err) => {console.log("signup err>> ",err)
                             console.log(url+"/signup")});   
        
    }

console.log(url);


    return(
        <div className="auth-wrap">
            <p className="expense-tracker-p">Expense Tracker</p>

        <div className="box">
            <p className="register-login" id="register-p">Register</p>

            <form id="auth-form">
                <input className="auth-input" type="text" placeholder="username" onChange={(e)=>{handleChange(e,"1")}}></input>
                <input className="auth-input" type="text" placeholder="password" onChange={(e)=>{handleChange(e,"2")}}></input>
                <p style={errorDisplay} className="message error-p"><span className="logo"><BiErrorCircle/></span>{message}</p>
                <p style={successDisplay} className="message success-p"><span className="logo"><MdDone/></span>{message}</p>
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