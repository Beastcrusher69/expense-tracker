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
          return <tr><td>{d.purpose}</td><td>{d.expense}</td><td><button className="delete" onClick={()=>{props.handleDelete(d._id)}}>Delete</button></td></tr>
        })}
      </tbody>
    </table>
    </div>
    )
}

function App(){

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
    axios.get(url).then( (getRes) => {console.log(getRes.data);
      setData(getRes.data)})
  },[])

  async function  handleSubmit(e){
    // e.preventDefault();
    if(input.purposeValue && input.expenseValue){
    // setData([...data,{purpose:input.purposeValue,expense:input.expenseValue}])

    await axios.post(url,{ purpose : input.purposeValue , expense : input.expenseValue})
    .then((postRes) => {
      console.log(postRes.data)

      axios.get(url).then( (getRes) => {console.log(getRes.data);
                                        setData(getRes.data)})
                  
    })
    .catch( (err)=>console.log({"axios post error" : err}))
    }
  }

  function handleDelete(id){
    // let filteredData = data.filter((d)=>(d.expense != deleteData.expense || d.purpose != deleteData.purpose));
    // setData(filteredData);

    console.log(id);

    axios.delete("http://localhost:1000/expense-data/"+id)
         .then(res => console.log(res.data))
         .catch((err)=>console.log(err));


  }


  return(
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
  )
}

export default App
