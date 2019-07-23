import React, { useState } from 'react';
// import './SoundPlayer.css';
import ReactPlayer from 'react-player';

function SoundPlayer({ url }) {
  const [volume, setVolume] = useState(0.8);
  const [showSlider, setShowSlider] = useState(false);


  let style = showSlider ? { color: 'rgb(4, 4, 185)' } : { color: 'blue' };

  const volumeHandleClick = () => {
    setShowSlider(!showSlider);
    style = showSlider ? { color: 'rgb(4, 4, 185)' } : { color: 'blue' };
  };
  return (
    <div>
      <div className="d-none">
        <ReactPlayer
          url={url}
          playing
          volume={volume}
        />
      </div>
      <div className="volumeAll d-flex justify-content-center">
        <div className="soundIcon">
          <i className="icon icon-volume-mute" tabIndex="0" role="button" style={style} onClick={() => volumeHandleClick()} title="Modifier le volume" />
        </div>
        {showSlider
          ? (
            <div className="sliderwrapper">
              <input
                type="range"
                min="0"
                max="1"
                step="0.001"
                value={volume}
                onChange={e => setVolume(e.target.value)}
                className="form-control-range"
              />
            </div>
          )
          : null}
      </div>
    </div>
  );
}

export default SoundPlayer;
