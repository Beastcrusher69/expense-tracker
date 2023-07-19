import { useState , useEffect} from 'react'
import axios from 'axios'
import './index.css'
import { RxCross2 } from "react-icons/rx";
import { IoSettingsSharp } from "react-icons/io5";
import { be_url } from './config';
import { useNavigate } from 'react-router-dom';

let url = be_url;
export let authHeader = undefined;
let user = undefined ; 

function decode(token){

  let base64url = token.split("=")[1].split(".")[1];

  let base64 = base64url.replace("-","+").replace("_","/");

  return JSON.parse(window.atob(base64)).username;
}

function Display(props){

let {data}=props;
let serial = 0;

  return ( 
    < div>
    <table>
      <thead>
      <tr><th>Sr.no.</th><th>purpose of expense</th><th>amount</th><th></th></tr>
      </thead>
      <tbody>
        {data.map((d)=>{
            serial++;
          return <tr key={serial}><td className="serial-cell">{serial}</td><td>{d.purpose}</td><td>{d.expense}</td><td><button className="delete" onClick={()=>{props.handleDelete(d._id)}}><span className="cross"><RxCross2/></span><span className="delete-span">Delete</span></button></td></tr>
        })}
      </tbody>
    </table>
    </div>
    )
}

function ExpenseTracker(){

let [data , setData] =  useState([]);
//[{purpose:'jay',expense:'200'}]
let [input , setInput] = useState({purposeValue:null,expenseValue:null});
let navigate = useNavigate();
let [optDisplay,setOptDisplay] = useState("none");
let [userColor,setUserColor] = useState("white");

    useEffect(()=>{
    window.addEventListener('keydown',(e)=>{
      if(e.code === "Enter"){
        handleSubmit();
      }
    })
  })

  useEffect(()=>{
    authHeader = { headers : {
      authorization : document.cookie 
    }}
    
    if(document.cookie){
    user = decode(document.cookie);
    }

    axios.get(url + "/expense-data",authHeader,{withCredentials: true}).then( (getRes) => {console.log("first fetch");
      setData(getRes.data)})
      .catch( (err)=> {
        console.log(err);
        navigate("/login")
      }
      )
  },[])

  async function handleSubmit(e){
    e.preventDefault();

    if(input.purposeValue && input.expenseValue){

    await axios.post(url + "/expense-data",{ purpose : input.purposeValue , expense : input.expenseValue},authHeader)
    .then((postRes) => {
      console.log(postRes.data)

      axios.get(url + "/expense-data",authHeader).then( (getRes) => {console.log(getRes.data);
                                        setData(getRes.data)})
      .catch( (err)=>{console.log({"axios get error" : err});
      navigate("/login")
    })
      
    })
    .catch( (err)=>{console.log({"axios post error" : err});
     navigate("/login")

  })
    }
  }

  function handleDelete(id){
  
    axios.delete(url  + "/expense-data/"+id,authHeader)
         .then((delRes) => {
          console.log(delRes.data);

          axios.get(url + "/expense-data",authHeader).then( (getRes) => {
          setData(getRes.data)})})

         .catch((err)=>{console.log(err);
     navigate("/login")

        });

  }

  function toggleSettings(){

    if(optDisplay === "none"){
      setOptDisplay("flex");
      setUserColor("var(--green3)");
    }
    else{
      setOptDisplay("none");
      setUserColor("white");
    }
  }

  function changePassword(){
    navigate("/change-password");
  }

  function deleteAccount(){

    if(window.confirm("are you sure, you want to delete the account? All your data will be lost")){

      axios.delete(url + "/delete-account", authHeader )
          .then((res) => {
            navigate("/login");
          })
          .catch((err)=> console.log(err));
    }
    else{
    }

  }

  return(
    <div id="page">
    <header><span id="expense-tracker-heading">
                  <span id="expense">Expense</span>
                  <span id="tracker">Tracker</span>
            </span> 

            <div id="settings-wrap">
            <span id="user"  onClick={toggleSettings} style={{"backgroundColor" : userColor}}>{user}<IoSettingsSharp id="settings-icon"/></span>
            <div id="hamburger" style={{"display" : optDisplay}}>
              <span className='settings-options' onClick={changePassword}>change password</span>
              <span className='settings-options' onClick={deleteAccount}>delete account</span>
            </div>
            </div>
    </header>
    
    <div id="whole-wrapper">
    <form id="input-wrap">
      <input  
              onChange={(e)=>{ e.preventDefault() ;
               setInput({...input , purposeValue:e.target.value})}} 
               name="purpose" 
               placeholder='purpose' />
      <input  
                onChange={(e)=>{ e.preventDefault() ;
                setInput({...input ,expenseValue:e.target.value})}} 
                name="expense" 
                placeholder='expense' />
      <button id="input-button" 
              onClick={handleSubmit}
              >Enter</button>
    </form>
    <Display data={data} handleDelete={handleDelete}/>
    </div>
    </div>
  )
}

export default ExpenseTracker




