import { useState } from 'react'
import './App.css'

let initArr = ['','',['','']];
let displayContent = "";

function Wrap(){

let [Arr , setArr] =  useState(initArr);

  function handleChange1(e){

      setArr([e.target.value,Arr[1],Arr[2]]);
      console.log("1>>" + Arr[2]);

  }

  function handleChange2(e){

    setArr([Arr[0],e.target.value,Arr[2]]);
    console.log("2>>" + Arr[2]);

}
  

  function handleClick(){
    console.log('clicked');

    setArr([Arr[0],Arr[1],[Arr[0],Arr[1]]]);
    displayContent = displayContent + "<p>{Arr[2]}</p>";

    console.log("3>>" + Arr[2]);

  }

  return(
    <>
     <Input1 handleChange1={handleChange1}/>
     <Input2 handleChange2={handleChange2}/>
     <Button handleClick={handleClick}/> 
    <Display Arr={Arr}/>
    </>
   
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

  return (<button onClick={props.handleClick}/>
  )
}

function Display(props){

  return ( 
    <>
    {displayContent}

    </>
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
