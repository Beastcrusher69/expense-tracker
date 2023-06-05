import { useState , useEffect} from 'react'
import './App.css'

let tableRows=[]
let initArr = ['jay','kapadia',tableRows];
let keyVar = 1;

function Input1(props){

  return (<input onChange={props.handleChange1} id="purpose"/>
  )
}

function Input2(props){

  return (<input onChange={props.handleChange2} id="expense"/>
  )
}

function Button(props){
  
  return (<button id="input-button" onClick={props.handleClick} onKeyDown={props.handleKeyDown}>Enter</button>
  )
}

function Display(props){

  return ( 
    < div>
    <table>
      <thead>
      <tr><th>purpose of expense</th><th>amount</th><th></th></tr>
      </thead>
      <tbody>
      {props.Arr[2]}
      </tbody>
    </table>
    </div>
    )
}

function Wrap(){

let [Arr , setArr] =  useState(initArr);

  function handleChange1(e){

      setArr([e.target.value,Arr[1],Arr[2]]);
  }

  function handleChange2(e){

    setArr([Arr[0],e.target.value,Arr[2]]);

}

function handleClick(){
  
  Arr[2].push(<tr key={keyVar}><td>{Arr[0]}</td><td>{Arr[1]}</td><td className="button-cell"><button className="delete" key={keyVar} id={keyVar} onClick={(e)=>{deleteRow(e)}}>delete</button></td></tr>);
    setArr([Arr[0],Arr[1],Arr[2]]);

    keyVar++;
}
function handleKeyDown(e){
  console.log('yes');
  if(e.code == 'Enter')
  handleClick();
}

useEffect(() => {
  document.addEventListener('keydown', handleKeyDown);

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}, []);

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
    <Input1 handleChange1={handleChange1}/>
     <Input2 handleChange2={handleChange2}/>
     <Button handleClick={handleClick} handleKeyDown={handleKeyDown}/> 
    </div>
    <Display Arr={Arr}/>
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
