import React from "react";
import {useState} from "react";
import './index.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import { be_url } from './config';
let url = be_url;

function ChangePassword(){

    let navigate = useNavigate();

    let [fields, setFields] = useState({password : null , newPassword : null});
    let [message,setMessage] = useState("");
    let [errorDisplay, setErrorDisplay] = useState({"display":"none"});
    let [successDisplay, setSuccessDisplay] = useState({"display":"none"});

    function handleChange(e,i){

        if(i == "1"){
            setFields({...fields , password:e.target.value});
        }
        else{
            setFields({...fields , newPassword:e.target.value});
        }
    }

    
    function Confirm(e){
        e.preventDefault();
        console.log(fields);
        
        axios.put(url + "/change-password", fields , {withCredentials : true})
        .then((res)=>{

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

             .catch((err)=>{console.log(err)});
    }

    return(
        <div className="auth-wrap">
            <p className="expense-tracker-p">Expense Tracker</p>

        <div className="box">

            <form id="auth-form">
                <input className="auth-input" type="text" placeholder="current password" onChange={(e)=>{handleChange(e,"1")}}></input>
                <input className="auth-input" type="text" placeholder="new password" onChange={(e)=>{handleChange(e,"2")}}></input>
                <p style={errorDisplay} className="message error-p"><span className="logo"><BiErrorCircle/></span>{message}</p>
                <p style={successDisplay} className="message success-p"><span className="logo"><MdDone/></span>{message}</p>
                <span className="button-span">
                <button className="auth-buttons" id="login" onClick={Confirm}>Confirm</button>
                </span>
                
            </form>
        </div>
        </div>
    )
}

export default ChangePassword




