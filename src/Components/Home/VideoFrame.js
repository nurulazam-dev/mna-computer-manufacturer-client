import React from 'react';

const VideoFrame = () => {
    return (
        <div className='px-3'>
            <iframe className='video_frame'
                src="https://www.youtube.com/embed/d6j3I_LUsPQ"
                title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
    );
};

export default VideoFrame;