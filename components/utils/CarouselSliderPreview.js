import React, { useRef, useState } from 'react'
// import {VolumeUp, VolumeOff, PlayArrow} from '@mui/icons-material'
import { FaTrashAlt } from "react-icons/fa"

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
  return (
    <div className='border'>
        <FaTrashAlt className="text-black cursor-pointer" onClick={()=> setFiles(prev => {return prev.filter(pre=>pre.name != file.name)})}/>
        {file && (<>
                {(file.type==="image/png" || file.type==="image/jpg" || file.type==="image/jpeg" || file.type==="image/webp") && <img className='w-full' src={URL.createObjectURL(file)} alt="" />}
                {file.type==="video/mp4" && <video ref={videoRef} autoPlay muted loop onClick={videoClick} style={{width: "100%"}} controls><source src={URL.createObjectURL(file)} type="video/mp4"/></video>}
            </>)}
    </div>
  )
}

export default CarouselSliderPreview