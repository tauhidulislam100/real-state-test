import React, { useCallback, useRef, useState } from "react";
import CanvasComponent from "./Components/CanvasComponent";
import Toolbar from "./Components/Toolbar";
import { useCanvasContext } from "./hooks/useCanvasContext";

const CanvasContainer = () => {
  const containerRef = useRef(null);
  const {
    state: { canvasData, enableQuillToolbar },
  } = useCanvasContext();

  return (
    <div ref={containerRef}>
      <Toolbar isEditEnable={enableQuillToolbar} />
      <div className="canvas-container border border-black" id="canvas">
        {canvasData.map((canvas) => {
          return <CanvasComponent key={canvas.id} {...canvas} />;
        })}
      </div>
    </div>
  );
};

export default CanvasContainer;
