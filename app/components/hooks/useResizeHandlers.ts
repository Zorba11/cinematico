import { useState } from 'react';

interface Dimensions {
  width: number;
  height: number;
}

export const useResizeHandlers = (initialDimensions: Dimensions) => {
  const [height, setHeight] = useState(initialDimensions.height);
  const [dimensions, setDimensions] = useState(initialDimensions);

  const handleResize = (e: MouseEvent) => {
    const startY = e.clientY;
    const startHeight = height;

    const onMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - startY;
      setHeight(Math.max(300, startHeight + deltaY));
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handleCornerResize = (e: MouseEvent) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = dimensions.width;
    const startHeight = dimensions.height;

    const onMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      setDimensions({
        width: Math.max(600, startWidth + deltaX),
        height: Math.max(400, startHeight + deltaY),
      });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return {
    height,
    width: dimensions.width,
    dimensions,
    handleResize,
    handleCornerResize,
  };
};
