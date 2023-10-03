import React, { useState } from 'react'
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
function Volume(props) {
   console.log(props);
   const [volume,setVolume]=useState("false");
const handleVolume=(id)=>{
//  console.log("index->"+id);
setVolume(!volume);

    let volumeButton=document.getElementById(id);
//     console.log(volumeButton);
//     console.log("a->"+volumeButton.attribute);
console.log(volumeButton.muted)
 volumeButton.muted=!volumeButton.muted;
}
  return (

    <span style={{filter: "drop-shadow(2px 4px 6px grey)"}}  >
        {(volume==false)?
      <VolumeUpIcon onClick={()=>handleVolume(props.Id)} style={{fill:"white"}} className="font-xl text-xl " ></VolumeUpIcon>
       :
       <VolumeOffIcon onClick={()=>handleVolume(props.Id)} style={{fill:"white"}} className="font-xl text-xl " ></VolumeOffIcon>
       }
      </span>
  )
}

export default Volume
//(2px 4px 6px grey);
