import React from "react";

const VideoFrame = () => {
  return (
    <div className="px-3">
      <iframe
        className="video_frame"
        src="https://www.youtube.com/embed/RZHDuzQHksM?si=yjHmBCLRV7gZqpGh"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default VideoFrame;
