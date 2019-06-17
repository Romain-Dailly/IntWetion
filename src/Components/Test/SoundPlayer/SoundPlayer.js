import React, { useState } from 'react';
import Slider from 'react-rangeslider';

export default function SoundPlayer (props) {

  const soundUrl = "https://youtu.be/INAv0jmTmC8";
  // props.card.videos.map(video => {
  //   if (video.type_video === 2) {
  //     return video.url_video;
  //   };
  // });

  const [volume, setVolume] = useState(0.5)
  const [showSlider, setShowSlider] = useState(false)
  
  const volumeHandleClick = () => {
    setShowSlider(!showSlider)
  }
  return(
    <div className="volumeAll d-flex justify-content-center">
      <div>
        <div className="soundIcon mt-5"  >
        <i className='fas fa-volume-up'onclick={() => volumeHandleClick}></i>
        </div>
        { showSlider ?
        <Slider 
        value={volume}
        orientation="vertical"
        onChange={ (e)=> setVolume(e.target.value) }
        />
        : null }
      </div>
    </div>
  )
}
