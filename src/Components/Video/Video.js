import React, { useEffect, useRef } from 'react';
import './Video.css';
import Plyr from 'plyr';
import '../../css/plyr.css';

const Video = ({
  onEnded, videoKey, onContinue, onClose,
}) => {
  const player = useRef();
  const options = {
    autoplay: true,
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
      <div className="container">
        <div className="d-flex flex-column w-100">
          <div className="video w-100">
            <div className=" player-wrapper">
              <div>
                <div ref={player} data-plyr-provider="youtube" data-plyr-embed-id={videoKey} />
              </div>
            </div>
          </div>

          <div className="d-flex mt-2">
            <button type="button" onClick={onClose} className="button button-primary mr-3">
              Quitter
            </button>
            <button type="button" onClick={onContinue} className="button button-primary">
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
