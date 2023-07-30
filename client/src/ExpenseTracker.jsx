import { useState , useEffect} from 'react'
import axios from 'axios'
import './index.css'
import { RxCross2 } from "react-icons/rx";
import { AiOutlineCamera } from "react-icons/ai";
import { IoSettingsSharp } from "react-icons/io5";
import { be_url } from './config';
import { useNavigate } from 'react-router-dom'; 
let url = be_url;
let user = undefined ; 

function Display(props){

let {data}=props;
let serial = 0;

  return ( 
    < div>
    <table>
      <thead>
      <tr><th>Sr.no.</th><th>purpose of expense</th><th>amount</th><th></th></tr>
      </thead>
      <tbody>
        {data.map((d)=>{
            serial++;
          return (
          <tr key={serial}>
            <td className="serial-cell">{serial}</td>
            <td>{d.purpose}</td>
            <td>{d.expense}</td>
            <td className="last-cell">
              <span className='last-cell-wrap'>
              <button className="delete-button" onClick={()=>{props.handleDelete(d._id)}}>
                <span className="cross"><RxCross2/></span>
                <span className="delete-span">Delete</span>
              </button>
              <a className="view-image-button" 
                 href={d.imageUrl}
                 target='_blank' >
                <span className="cross"><AiOutlineCamera/></span>
                <span className="delete-span">View Image</span>
              </a>
              </span>
            </td>
          </tr>
        )})}
      </tbody>
    </table>
    </div>
    )
}

function ExpenseTracker(){

let [data , setData] =  useState([]);
//[{purpose:'jay',expense:'200'}]
let [input , setInput] = useState({purposeValue:null,expenseValue:null});
let navigate = useNavigate();
let [optDisplay,setOptDisplay] = useState("none");
let [userColor,setUserColor] = useState("white");
let [image, setImage] = useState(null);
let [imagePreview , setImagePreview ] = useState(null);
let [imagePreviewStyle , setImagePreviewStyle ] = useState({display : 'none'})

    useEffect(()=>{
    window.addEventListener('keydown',(e)=>{
      if(e.code === "Enter"){
        handleSubmit();
      }
    })
  })

  useEffect(()=>{
    
    axios.get(url + "/expense-data",{withCredentials: true})
    .then( (res) => {
      console.log("first fetch");
      setData(res.data.expenseData)
      user = res.data.username;})
    .catch( (err)=> {
        console.log(err);
        navigate("/login")
      }
      )
  },[])


  function uploadImage(){
    let data = new FormData();
    data.append('file',image);
    data.append('upload_preset','expense-tracker')
    data.append('cloud_name','dgqba5trl')

    return axios.post("https://api.cloudinary.com/v1_1/dgqba5trl/image/upload",data)

  }

  async function handleSubmit(e){
    e.preventDefault();

    let imageUrl = null ;

    if(input.purposeValue && input.expenseValue){

      if(image)
      {
        await uploadImage()
      .then((res) => {console.log(res.data.url);
                      imageUrl = res.data.url;
                      })
      .catch((err)=> console.log(err))

      console.log(imageUrl);
      }

    await axios.post(url + "/expense-data",{ purpose : input.purposeValue , expense : input.expenseValue , imageUrl},{withCredentials: true})
    .then((postRes) => {
      console.log(postRes.data)

      axios.get(url + "/expense-data",{withCredentials: true}).then( (getRes) => {console.log(getRes.data);
                                        setData(getRes.data.expenseData)
                                       setImagePreview(null);
                                      setImagePreviewStyle({display : 'none'})})
      .catch( (err)=>{console.log({"axios get error" : err});
      navigate("/login")
    })
      
    })
    .catch( (err)=>{console.log({"axios post error" : err});
     navigate("/login")

  })

  
    }
  }

  function handleDelete(id){
  
    axios.delete(url  + "/expense-data/"+id , {withCredentials: true})
         .then((delRes) => {
          console.log(delRes.data);

          axios.get(url + "/expense-data", {withCredentials: true}).then( (getRes) => {
          setData(getRes.data.expenseData)})})

         .catch((err)=>{console.log(err);
     navigate("/login")

        });

  }

  function toggleSettings(){

    if(optDisplay === "none"){
      setOptDisplay("flex");
      setUserColor("var(--green3)");
    }
    else{
      setOptDisplay("none");
      setUserColor("white");
    }
  }

  function changePassword(){
    navigate("/change-password");
  }

  function deleteAccount(){

    if(window.confirm("are you sure, you want to delete the account? All your data will be lost")){

      axios.delete(url + "/delete-account" , {withCredentials : true})
          .then((res) => {
            navigate("/login");
          })
          .catch((err)=> console.log(err));
    }
    return ;

  }

  return(
    <div id="page">
    <header><span id="expense-tracker-heading">
                  <span id="expense">Expense</span>
                  <span id="tracker">Tracker</span>
            </span> 

            <div id="settings-wrap">
            <span id="user"  onClick={toggleSettings} style={{"backgroundColor" : userColor}}>{user}<IoSettingsSharp id="settings-icon"/></span>
            <div id="hamburger" style={{"display" : optDisplay}}>
              <span className='settings-options' onClick={changePassword}>change password</span>
              <span className='settings-options' onClick={deleteAccount}>delete account</span>
            </div>
            </div>
    </header>
    
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


      <div id="upload-wrap">
      <label htmlFor="image-input" id="upload-image">upload image</label>
      <p id="image-preview" style={imagePreviewStyle}>{imagePreview}</p>
      <input type="file" id="image-input" onChange={(e)=>{ setImage(e.target.files[0]); setImagePreview(e.target.files[0].name); setImagePreviewStyle({display : 'block'}) ; console.log(e.target.files)}}/>            
      </div>
      <button id="enter" 
              onClick={handleSubmit}
              >Enter</button>
    </form>
    <Display data={data} handleDelete={handleDelete}/>
    </div>
    </div>
  )
}

export default ExpenseTracker




