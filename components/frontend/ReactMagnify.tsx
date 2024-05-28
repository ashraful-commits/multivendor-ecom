import React, { useState, useRef } from 'react';
import Image from "next/image";

const ReactMagnify = ({ imageUrl, alt="" }: { imageUrl: string, alt?: string }) => {
  const [zoomScale, setZoomScale] = useState(1); // Initial zoom scale
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showDoubleClickText, setShowDoubleClickText] = useState(false);
  const [firstHover, setFirstHover] = useState(true); // State to track the first hover
  const imageRef = useRef<HTMLImageElement>(null);

  const handleHover = () => {
    if (firstHover) {
      const zoomFactor = 2; // Zoom factor for the first hover
      setZoomScale(zoomFactor);
      setFirstHover(false); // Set firstHover to false after the first hover
    }
  };

  const handleDoubleClick = () => {
    const zoomFactor = 1.5; // Zoom factor for double-click
    const newZoomScale = zoomScale * zoomFactor;
    setZoomScale(newZoomScale);

    if (imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect();
      const x = (position.x * width + left) / width;
      const y = (position.y * height + top) / height;
      setPosition({ x, y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setPosition({ x, y });

    // Show the double-click text if it's not already shown
    setShowDoubleClickText(true);
  };

  const handleMouseLeave = () => {
    setZoomScale(1); // Reset zoom scale when mouse leaves
    setShowDoubleClickText(false); // Hide the double-click text when mouse leaves
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block', overflow: 'hidden', cursor: 'pointer' }}>
      <Image
        onMouseMove={handleMouseMove}
        onMouseOver={handleHover} // Trigger handleHover on hover
        onMouseLeave={handleMouseLeave}
        onDoubleClick={handleDoubleClick}
        width={1000}
        height={1000}
        src={imageUrl}
        blurDataURL={imageUrl} loading="lazy"
        alt={alt}
        className="w-full h-full"
        style={{ transform: `scale(${zoomScale})`, transformOrigin: `${position.x * 100}% ${position.y * 100}%`, transition: 'transform 0.3s' }}
        ref={imageRef}
      />
      {showDoubleClickText && (
        <div
          style={{
            position: 'absolute',
            left: `${position.x * 100}%`,
            top: `${position.y * 100 + 30}%`, // Adjust the position of the text element relative to the cursor
            transform: 'translate(-50%, -50%)',
            background: 'rgba(255, 255, 255, 0.8)',
            padding: '5px',
            borderRadius: '5px',
            zIndex: 9999,
          }}
        >
          <span className="text-xs">For more zoom, please double-click</span>
        </div>
      )}
    </div>
  );
};

export default ReactMagnify;
