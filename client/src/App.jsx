import { useState , useEffect} from 'react'
import './App.css'

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

    useEffect(()=>{
    window.addEventListener('keydown',(e)=>{
      if(e.code === "Enter"){
        handleSubmit();
      }
    })
  })

  useEffect(()=>{
    fetch("http://localhost:1000/users").then(
      res => res.json()
    )
    .then(d => setData(d))
  },[])

  function handleSubmit(e){
    console.log(input);
    if(input.purposeValue && input.expenseValue){
    setData([...data,{purpose:input.purposeValue,expense:input.expenseValue}])
    }
  }

  function handleDelete(deleteData){
    let filteredData = data.filter((d)=>(d.expense != deleteData.expense || d.purpose != deleteData.purpose));
    setData(filteredData);
  }


  return(
    <div id="whole-wrapper">
    <div id="input-wrap">
      <input  onChange={(e)=>{ e.preventDefault() ;setInput({...input , purposeValue:e.target.value})}} name="purpose" placeholder='purpose' />
      <input  onChange={(e)=>{ e.preventDefault() ;setInput({...input ,expenseValue:e.target.value})}} name="expense" placeholder='expense' />
      <button id="input-button" onClick={handleSubmit} >Enter</button>
    </div>
    <Display data={data} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
