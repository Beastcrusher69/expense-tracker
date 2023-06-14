import { useState , useEffect} from 'react'
import axios from 'axios'
import './App.css'

let url = "http://localhost:1000/expense-data";

function Display(props){
let {data}=props;
  return ( 
    < div>
    <table>
      <thead>
      <tr><th>purpose of expense</th><th>amount</th><th></th></tr>
      </thead>
      <tbody>
        {data.map((d)=>{
          return <tr><td>{d.purpose}</td><td>{d.expense}</td><td><button className="delete" onClick={()=>{props.handleDelete(d)}}>Delete</button></td></tr>
        })}
      </tbody>
    </table>
    </div>
    )
}

function App(){

let [data , setData] =  useState([]);
let [input , setInput] = useState({purposeValue:null,expenseValue:null})
//[{purpose:'jay',expense:'200'}]

  //   useEffect(()=>{
  //   window.addEventListener('keydown',(e)=>{
  //     if(e.code === "Enter"){
  //       handleSubmit();
  //     }
  //   })
  // })

  // useEffect(()=>{
  //   fetch("http://localhost:1000/expense-data").then(
  //     res => res.json()
  //   )
  //   .then(d => setData(d))
  // })

  async function  handleSubmit(e){
    console.log("submit");
    e.preventDefault();
    if(input.purposeValue && input.expenseValue){
    // setData([...data,{purpose:input.purposeValue,expense:input.expenseValue}])

    console.log(input);

    await axios.post(url,input)
    .then( 
      console.log("then")
      )
    .catch( (err)=>{
      console.log(err);
    })
    }
  }

  function handleDelete(deleteData){
    let filteredData = data.filter((d)=>(d.expense != deleteData.expense || d.purpose != deleteData.purpose));
    setData(filteredData);
  }


  return(
    <div id="whole-wrapper">
    <form id="input-wrap" 
    // action="/post" method="post"
    >
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
  )
}

export default App
