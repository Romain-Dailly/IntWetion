import React, { useEffect, useRef } from 'react';
import './Video.css';
import Plyr from 'plyr';
import '../../css/plyr.css';

const Video = ({
  onEnded, videoKey, onContinue, onClose,
}) => {
  const player = useRef();
  const options = {
    autoplay: false,
  };

  useEffect(() => {
    const videoPlayer = new Plyr(player.current, options);
    videoPlayer.on('ended', () => {
      onEnded();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="overlay">
      <div className="d-flex flex-column w-100">
        <div className="video w-100">
          <div className=" player-wrapper">
            <div>
              <div
                ref={player}
                data-plyr-provider="youtube"
                data-plyr-embed-id={videoKey}
              />
            </div>
          </div>
        </div>

        <div className="d-flex">
          <button onClick={onClose} className>
            Exit
          </button>
          <button onClick={onContinue}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default Video;
