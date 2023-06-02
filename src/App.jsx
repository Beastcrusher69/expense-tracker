import { useState } from 'react'
import './App.css'

let tableRows=[<tr><th>purpose of expense</th><th>amount</th></tr>]
let initArr = ['','',['first','value'],tableRows];

function Wrap(){

let [Arr , setArr] =  useState(initArr);

  function handleChange1(e){

      setArr([e.target.value,Arr[1],Arr[2],Arr[3]]);
  }


  function handleChange2(e){

    setArr([Arr[0],e.target.value,Arr[2],Arr[3]]);

}

  function handleClick(){


    setArr([Arr[0],Arr[1],[Arr[0],Arr[1]],Arr[3]]);
    displayContentFun();
  }
  
  console.log(Arr);
  function displayContentFun(){

    Arr[3].push(<tr><td> {Arr[0]} </td> <td> {Arr[1]}</td></tr>);
    setArr([Arr[0],Arr[1],Arr[2],Arr[3]]);

  }

  return(
    <div id="whole-wrapper">
    <div id="input-wrap">
    <Input1 handleChange1={handleChange1}/>
     <Input2 handleChange2={handleChange2}/>
     <Button handleClick={handleClick}/> 
    </div>
     
    <Display Arr={Arr}/>
    </div>
   
  )

}

function Input1(props){

  return (<input onChange={props.handleChange1} id="#purpose"/>
  )
}

function Input2(props){

  return (<input onChange={props.handleChange2} id="expense"/>
  )
}

function Button(props){

  return (<button id="input-button" onClick={props.handleClick}>Enter</button>
  )
}

function Display(props){

  return ( 
    < div>
    <table>
    {props.Arr[3]}
    </table>
    </div>
    )
}


function App() {
  return (
    <>
      <Wrap></Wrap>
    </>
    
  )
}

export default App
