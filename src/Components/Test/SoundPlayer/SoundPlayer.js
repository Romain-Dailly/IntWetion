import React, { useState } from 'react';
import './SoundPlayer.css';
import ReactPlayer from 'react-player';

export default function SoundPlayer (props) {

  const soundUrl = "https://youtu.be/tCu2RVCpges";
  // props.card.videos.map(video => {
  //   if (video.type_video === 2) {
  //     return video.url_video;
  //   };
  // });

  const [volume, setVolume] = useState(0.8)
  const [showSlider, setShowSlider] = useState(false)
  
  let style = showSlider ? {color:'rgb(4, 4, 185)'} : {color:'blue'};

  const volumeHandleClick = () => {
    setShowSlider(!showSlider)
    showSlider? style = {color:'rgb(4, 4, 185)'} : style= {color:'blue'};
  }
  return(
    <div>
    <div className="player">
      <ReactPlayer 
        url={soundUrl}
        playing
        volume={volume}
      />
    </div>
    <div className="volumeAll d-flex justify-content-center">
      { showSlider ?
      <div className="sliderwrapper">
        <input type="range"
          min="0"
          max="1"
          step="any"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="form-control-range"
        />
      </div>
        : null } 
      <div className="soundIcon"  >
        <i className='fas fa-volume-down' style={style} onClick={() => volumeHandleClick()} title="Modifier le volume"></i>
      </div>
    </div>
    </div>
  )
}
