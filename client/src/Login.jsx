import React from "react";
import {useState} from "react";
import './index.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi"

function LoginForm(){

    let navigate = useNavigate();

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

    function login(e){
        e.preventDefault();

        axios.post("http://localhost:1000/login",cred)
             .then(res =>{
                console.log(res.data)
                if(res.data.success == true){
                navigate('/expense-tracker')
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
            <p className="register-login" id="login-p" >Login</p>

            <form id="auth-form">
                <input className="auth-input" type="text" placeholder="username" onChange={(e)=>{handleChange(e,"1")}}></input>
                <input className="auth-input" type="text" placeholder="password" onChange={(e)=>{handleChange(e,"2")}}></input>
                <p style={display} class="error"><span className="error-logo"><BiErrorCircle/></span>{error}</p>
                <span className="button-span">
                <button className="auth-buttons" id="login" onClick={login}>Login</button>
                </span>
                
            </form>
        </div>
        </div>
    )
}

export default LoginForm