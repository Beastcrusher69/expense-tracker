import { useState } from 'react'
import './App.css'

function Input(props){

  const [text , setText] =  useState('');

  return (<input onChange={()=>{ setText()}}>{}</input>
  )
}

function App() {
  return (
    <>
      <Input></Input>
    </>
    
  )
}

export default App
