import { AppContext } from "@/app/store/app-context";
import React, { useContext, useEffect } from "react";

const VideoPlayer = ({ params }: { params: { slug: string } }) => {
  const { selected, setSelected, data } = useContext(AppContext);

  return (
    <div>
      <video
        id="my-player"
        className="video-js w-[1000px] h-full"
        controls
        preload="auto"
        data-setup="{}"
      >
        <source
          src={
            data[selected]?.url ||
            "http://res.cloudinary.com/dgmbiavwm/video/upload/v1706787057/Beauty_Videos/chapter-3_lgydugytfdhxwhvpa16pthbm2zvkboktcuhcabig.mp4"
          }
          type="video/mp4"
        ></source>
        <p className="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to
          a web browser that
          <a href="https://videojs.com/html5-video-support/" target="_blank">
            supports HTML5 video
          </a>
        </p>
      </video>
    </div>
  );
};

export default VideoPlayer;
