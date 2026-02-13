import React from "react";

const VideoBackground = () => {
    return (
        <div className="video-background">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="video-media"
            >
                <source
                    src="/assets/vid-mobile.mp4"
                    media="(max-width: 768px)"
                    type="video/mp4"
                />
                <source
                    src="/assets/vid-desktop.mp4"
                    media="(min-width: 769px)"
                    type="video/mp4"
                />
            </video>
            <div className="video-overlay"></div>
        </div>
    );
};

export default VideoBackground;
