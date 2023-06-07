import { useState , useEffect} from 'react'
import './App.css'

let tableRows=[]
let initArr = ['jay','kapadia',tableRows];
let keyVar = 1;


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
          return <div>{d.purpose}</div>
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

  function handleSubmit(e){

    console.log(input);


    if(input.purposeValue && input.expenseValue){
    setData([...data,{purpose:input.purposeValue,expense:input.expenseValue}])
    }
  }

  function handleKeyDown(e){

    console.log(e.code);

    if(e.code == "Enter"){
            handleSubmit();
    }
  }

  function deleteRow(e){

    let id = e.target.id ;   

    let newArroftr = Arr[2].filter((elem)=>{
      
      return (elem.key != id); 
    });
   
    setArr([Arr[0],Arr[1],newArroftr]);
  }

  return(
    <div id="whole-wrapper">
    <div id="input-wrap">
      <input  onChange={(e)=>{ e.preventDefault();console.log(e.target.value) ;setInput({...input , purposeValue:e.target.value})}} name="purpose" placeholder='purpose' onKeyDown={handleKeyDown}/>
      <input  onChange={(e)=>{ e.preventDefault(); console.log(e.target.value) ;setInput({...input ,expenseValue:e.target.value})}} name="expense" placeholder='expense' onKeyDown={handleKeyDown}/>

      <button id="input-button" onClick={handleSubmit} >Enter</button>
    </div>
    <Display data={data}/>
    </div>
   
  )

}


export default App
