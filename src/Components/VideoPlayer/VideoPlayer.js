import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import './VideoPlayer.css';

const VideoPlayer = ({ youtubeUrl }) => {
  const settings = {
    youtube: {
      playerVars: {
        showinfo: 0,
        modestbranding: 1,
        rel: 0,
      },
    },
  };
  return (
    <div className="player-wrapper">
      <ReactPlayer
        url={youtubeUrl}
        config={settings}
        className="react-player"
        width="100%"
        height="100%"
      />
    </div>
  );
};

VideoPlayer.propTypes = {
  youtubeUrl: PropTypes.string.isRequired,
};

export default VideoPlayer;
