import React, { useState } from 'react'
import  ReactDOM  from 'react-dom'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import "./Video.css"
const Video = (props) => {
  // console.log("a->"+JSON.stringify(props));
  const [play,setPlay]=useState(true);
  let idVal=props.Id;
    const handleClick=(id)=>{
      if(play==true){
        document.getElementById(id).pause();
       
      }else
      document.getElementById(id).play();
      setPlay(!play)
    } 
    const handleScroll=(e)=>{
        let next=ReactDOM.findDOMNode(e.target).parentNode.nextSibling
        if(next)
        {
            next.scrollIntoView()
            e.target.muted=true;
        }
    }
  return (
    // <div className="video-div" >
    <>
    {
    (play==false)?
  <PlayArrowIcon className=" absolute top-1/3 left-1/3 right-1/2 ml-6 mt-14" style={{fontSize:"4rem",fill:"white"}}></PlayArrowIcon>:<></>
    }
    <video src={props.src} onEnded={handleScroll} className="videos-styling " id={idVal} muted="muted" onClick={()=>handleClick(idVal)} />
    </>
    // </div>

  )
    
}

export default Video