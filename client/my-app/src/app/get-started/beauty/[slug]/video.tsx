import { AppContext } from "@/app/store/app-context";
import React, { useContext, useEffect } from "react";

const VideoPlayer = ({ params }: { params: { slug: string } }) => {
  const { selected, setSelected } = useContext(AppContext);
  const videoList = [
    {
      id: 1,
      name: "Chapter 1",
      url: "https://v3.cdnpk.net/videvo_files/video/free/2013-07/large_watermarked/hd0051_preview.mp4",
    },
    {
      id: 2,
      name: "Chapter 2",
      url: "https://v3.cdnpk.net/videvo_files/video/free/2013-07/large_watermarked/hd0051_preview.mp4",
    },
    {
      id: 3,
      name: "Chapter 3",
      url: "https://www.youtube.com/watch?v=0uGETVnkujA",
    },
    {
      id: 4,
      name: "Chapter 4",
      url: "https://www.youtube.com/watch?v=0uGETVnkujA",
    },
    {
      id: 5,
      name: "Chapter 5",
      url: "https://www.youtube.com/watch?v=0uGETVnkujA",
    },
    {
      id: 6,
      name: "Chapter 6",
      url: "https://www.youtube.com/watch?v=0uGETVnkujA",
    },
    {
      id: 7,
      name: "Chapter 7",
      url: "https://www.youtube.com/watch?v=0uGETVnkujA",
    },
    {
      id: 8,
      name: "Chapter 8",
      url: "https://www.youtube.com/watch?v=0uGETVnkujA",
    },
    {
      id: 9,
      name: "Chapter 9",
      url: "https://www.youtube.com/watch?v=0uGETVnkujA",
    },
    {
      id: 10,
      name: "Chapter 10",
      url: "https://www.youtube.com/watch?v=0uGETVnkujA",
    },
  ];

  console.log(selected);
  return (
    <div>
      <h1>Selected Chapter: {selected}</h1>

      <video
        id="my-player"
        className="video-js"
        controls
        preload="auto"
        data-setup="{}"
      >
        <source src={videoList[selected].url} type="video/mp4"></source>
        {/* <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"></source> */}
        {/* <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"></source> */}
        {/* <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg"></source> */}
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
