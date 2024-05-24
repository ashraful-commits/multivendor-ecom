'use client';

import React, { ReactNode, useRef, useEffect, useState } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';

interface DraggableComponentProps {
  children: ReactNode;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({ children }) => {
  const nodeRef = useRef(null);
  
  return (
    <Draggable
      nodeRef={nodeRef}
      axis="y"
      handle=".handle"
      defaultPosition={{ x: 0, y: 0 }}
      position={null}
      grid={[25, 25]}
      scale={1}
    >
      <div className="fixed right-0 top-32 z-[999999999]" ref={nodeRef}>
        <div className="handle">{children}</div>
      </div>
    </Draggable>
  );
};

export default DraggableComponent;
