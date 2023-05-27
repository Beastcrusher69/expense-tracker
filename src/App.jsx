import { useState } from 'react'
import './App.css'

let initArr = ['',''];

function Wrap(){

let [Arr , setArr] =  useState(initArr);

  function handleChange(e,i){

    if(i=1){
      // setArr([e.target.value,Arr[1]]);
      console.log('1')
    }
    else{
      // setArr([Arr[0],e.target.value]);
      console.log('2')

    }
  }

  function handleClick(){
    console.log('clicked');
  }

  return(
    <>
     <Input1 handleChange={handleChange}/>
     <Input1 handleChange={handleChange}/>
     <Button handleClick={handleClick}/> 
    <Display Arr={Arr}/>
    </>
   
  )

}

function Input1(props){

  return (<input onChange={()=>{props.handleChange(1)}} id="#purpose"/>
  )
}

function Input2(props){

  return (<input onChange={()=>{props.handleChange(2)}} id="expense"/>
  )
}

function Button(props){

  return (<button onClick={props.handleClick}/>
  )
}

function Display(props){

  return (<p>[{props.Arr[0]},{props.Arr[1]}]</p>
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
