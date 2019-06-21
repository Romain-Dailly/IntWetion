import React, { useState, useEffect } from 'react';
import './SoundPlayer.css';
import ReactPlayer from 'react-player';

function SoundPlayer() {
  const [volume, setVolume] = useState(0.8);
  const [showSlider, setShowSlider] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl('http');
  }, []);

  let style = showSlider ? { color: 'rgb(4, 4, 185)' } : { color: 'blue' };

  const volumeHandleClick = () => {
    setShowSlider(!showSlider);
    style = showSlider ? { color: 'rgb(4, 4, 185)' } : { color: 'blue' };
  };
  return (
    <div>
      <div className="player">
        <ReactPlayer
          url={url}
          playing
          volume={volume}
        />
      </div>
      <div className="volumeAll d-flex justify-content-center">
        {showSlider
          ? (
            <div className="sliderwrapper">
              <input
                type="range"
                min="0"
                max="1"
                step="any"
                value={volume}
                onChange={e => setVolume(e.target.value)}
                className="form-control-range"
              />
            </div>
          )
          : null}
        <div className="soundIcon">
          <i className="fas fa-volume-down" tabIndex="0" role="button" style={style} onClick={() => volumeHandleClick()} title="Modifier le volume" />
        </div>
      </div>
    </div>
  );
}

export default SoundPlayer;
