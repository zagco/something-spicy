import React from 'react';

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  return (
    <div className="relative flex justify-center items-center overflow-hidden w-full ">
      <video className=" object-cover rounded-lg" autoPlay loop muted>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
    </div>
  );
};

export default VideoPlayer;
