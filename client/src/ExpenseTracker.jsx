import { useState , useEffect} from 'react'
import axios from 'axios'
import './index.css'
import { RxCross2 } from "react-icons/rx"
import { be_url } from './config';

let url = be_url;
let authHeader = { headers : {
  authorization : document.cookie 
}}

function Display(props){
let {data}=props;
let serial = 0;
// const token = sessionStorage.getItem('token');

// console.log(token)

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
let [input , setInput] = useState({purposeValue:null,expenseValue:null})

    useEffect(()=>{
    window.addEventListener('keydown',(e)=>{
      if(e.code === "Enter"){
        handleSubmit();
      }
    })
  })

  useEffect(()=>{
    axios.get(url + "/expense-data",authHeader).then( (getRes) => {console.log("first fetch");
      setData(getRes.data)})
  },[])

  async function handleSubmit(e){
    e.preventDefault();

    if(input.purposeValue && input.expenseValue){

    await axios.post(url + "/expense-data",{ purpose : input.purposeValue , expense : input.expenseValue},authHeader)
    .then((postRes) => {
      console.log(postRes.data)

      axios.get(url + "/expense-data",authHeader).then( (getRes) => {console.log(getRes.data);
                                        setData(getRes.data)})
                  
    })
    .catch( (err)=>console.log({"axios post error" : err}))
    }
  }

  function handleDelete(id){
  
    axios.delete(url  + "/expense-data/"+id,authHeader)
         .then((delRes) => {
          console.log(delRes.data);

          axios.get(url + "/expense-data").then( (getRes) => {
          setData(getRes.data)})})

         .catch((err)=>console.log(err));

  }

  return(
    <div id="page">
    <header><span id="expense">Expense</span><span id="tracker">Tracker</span></header>
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
