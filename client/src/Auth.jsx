import React from "react";
import {useState} from "react";
import './Auth.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import App from "./App.jsx"; 

function Auth(){

    let navigate = useNavigate();

    let [cred, setCred] = useState({username : null , password : null});

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
                    navigate('/expense-tracker')
                } 
             }) 
             .catch((err) => console.log("signup err>> ",err));   
        
    }

    function login(e){
        e.preventDefault();

        axios.post("http://localhost:1000/login",cred)
             .then(res =>{
                console.log(res.data)
                if(res.data == true){
                navigate('/expense-tracker')
            }
            })  
             .catch((err) => console.log("signup err>> ",err)); 



    }

    return(
        <div id="auth-wrap">
        <div id="box">
            <p id="expense-tracker-p">Expense Tracker</p>
            <form id="auth-form">
                <input className="auth-input" type="text" placeholder="username" onChange={(e)=>{handleChange(e,"1")}}></input>
                <input className="auth-input" type="text" placeholder="password" onChange={(e)=>{handleChange(e,"2")}}></input>
                <span id="button-span">
                <button className="auth-buttons" onClick={login}>Login</button>
                <button className="auth-buttons" onClick={signUp}>Sign Up</button>
                </span>
                
            </form>
        </div>
        </div>
    )
}

export default Auth