import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./new.scss"
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

const New = ({ inputs,title}) => {

  const [file,setFile]=useState("");
  console.log(file)
  return (
    <div className='new'>
      <Sidebar/>
      <div className='newContainer'>
        <Navbar/>
        <div className='top'>
          <h1>{title}</h1>
        </div>
        <div className='bottom'>
          <div className='left'>
            <img src={file?URL.createObjectURL(file):"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"} alt=""/>
           {/* <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png' alt=""/> */}
            </div>
          <div className='right'>
            <form>
            <div className="formInput">
                <label  htmlFor="file">Image : <DriveFolderUploadIcon className='icons'/></label>
                <input type="file" id='file'    onChange={e=>setFile(e.target.files[0])} style={{display:"None"}}/>
              
              </div>

              {inputs.map((input)=>( 
              <div className="formInput" key={input.id}>
                <label >{input.label}</label>
                <input type={input.type} placeholder={input.placeholder}/>
              </div>

)) }
              {/* <div className="formInput">
                <lable >Name and Surname</lable>
                <input type="text" placeholder='John Doe'/>
              </div>
              <div className="formInput">
                <lable >Email</lable>
                <input type="email" placeholder='john_doe@gmail.com'/>
              </div>
              <div className="formInput">
                <lable >Phone</lable>
                <input type="text" placeholder='+11 223 4774'/>
              </div>
              <div className="formInput">
                <lable >Password</lable>
                <input type="password" />
              </div>
              <div className="formInput">
                <lable >Address</lable>
                <input type="text" placeholder='palroad surat'/>
              </div>
              <div className="formInput">
                <lable >Country</lable>
                <input type="text" placeholder='USA'/>
              </div> */}
              <button>SEND</button>
            </form>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default New
