import React, { useEffect } from "react";
import {useState} from "react";
import './index.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi"
import { be_url } from './config';

let url = be_url;

function LoginForm(){

    let navigate = useNavigate();
    let [cred, setCred] = useState({username : null , password : null});
    let [message,setMessage] = useState("");
    let [errorDisplay, setErrorDisplay] = useState({"display":"none"});

    useEffect(()=>{

        axios.get(url + "/login" , { withCredentials : true})
        .then((res) => { console.log(res.data)})
        .catch((err)=> { console.log(err)})

    }, [])

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

        axios.post(url + "/login", cred ,{withCredentials: true})
             .then(res =>{
                if(res.data.code == "2"){

                setTimeout(()=>{
                navigate('/expense-tracker')

                },1000)    
                console.log(res.headers)
            }
            else{
                setMessage(res.data.message);
                setErrorDisplay({"display" : "block" });

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
                <p style={errorDisplay} className="message error-p"><span className="logo"><BiErrorCircle/></span>{message}</p>
                <span className="button-span">
                <button className="auth-buttons" id="login" onClick={login}>Login</button>
                </span>
                
            </form>
        </div>
        </div>
    )
}

export default LoginForm