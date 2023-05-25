import { useState } from 'react'
import './App.css'

function Input(){
  return (<input/>
  )
}

function List(){
  return(<ul>
    <li>first item</li>
  </ul>)
}

function App() {
  return (
    <div>
      <Input></Input>
      <List></List>
    </div>
    
  )
}

export default App
