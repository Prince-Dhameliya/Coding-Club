import React, { useRef, useState } from 'react'
// import {VolumeUp, VolumeOff, PlayArrow} from '@mui/icons-material'
import { FaTrashAlt } from "react-icons/fa"

//Pdf Viewer
import Iframe from 'react-iframe';

const CarouselSliderPreview = ({file, setFiles}) => {

  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [pause, setPause] = useState(false);
  
  const videoClick = () => {
    if(videoRef.current){
      setPause((prev)=>!prev);
      videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause()
    }
  }

  // const videoMuteClick = () => {
  //     setMuted((prev)=>!prev);
  //     videoRef.current.muted ? videoRef.current.muted=false :  videoRef.current.muted=true;
  // }
  console.log(file.type);
  return (
    <div className='border'>
        <FaTrashAlt className="text-black cursor-pointer" onClick={()=> setFiles(prev => {return prev.filter(pre=>pre.name != file.name)})}/>
        {file && (<>
                {(["image/png", "image/jpg", "image/jpeg", "image/webp"].includes(file.type)) && <img className='w-full' src={URL.createObjectURL(file)} alt="" />}
                {["video/mp4"].includes(file.type) && <video ref={videoRef} autoPlay muted loop onClick={videoClick} style={{width: "100%"}} controls><source src={URL.createObjectURL(file)} type="video/mp4"/></video>}
                {["application/pdf"].includes(file.type) && <Iframe className="w-full" url={URL.createObjectURL(file)} id="pdf-iframe" />}
            </>)}
    </div>
  )
}

export default CarouselSliderPreview