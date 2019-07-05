import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { startQuiz } from "../../actions";
import "./Video.css";
import Plyr from "plyr";
import "../../css/plyr.css";

const Comment = () => {
  /**
   * Get a reference to the `dispatch` function from the Redux store.
   * Use it to dispatch needed redux `actions`.
   *
   * @see [dispatch] {@link https://redux.js.org/api/store#dispatch}
   */
  const dispatch = useDispatch();
  return (
    <div>
      <label htmlFor="textarea-comment">
        Write your comments based on the video you just watched
      </label>
      <div>
        <textarea
          className="w-100 my-3"
          name=""
          id="textarea-comment"
          cols="20"
          rows="10"
        />
      </div>
    </div>
  );
};
const Video = ({ onStarted, onEnded }) => {
  const [canComment, setCanComment] = useState(true);
  const player = useRef();
  const options = {
    autoplay: true
  };

  useEffect(() => {
    const videoPlayer = new Plyr(player.current, options);
    videoPlayer.on("ended", () => {
      setCanComment(true);
    });

    videoPlayer.on("playing", () => {
      setCanComment(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="video">
      <div className="container player-wrapper">
        <div>
          <div
            ref={player}
            data-plyr-provider="youtube"
            data-plyr-embed-id="bTqVqk7FSmY"
          />
          {canComment && <Comment continue={() => {}} />}
        </div>
      </div>
    </div>
  );
};

export default Video;
