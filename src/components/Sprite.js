import React, { useState } from "react";

function Sprite({ item, idx }) {
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    setOffset({
      x: e.clientX - item.x,
      y: e.clientY - item.y,
    });

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;

    const newX = e.clientX - offset.x;
    const newY = e.clientY - offset.y;

    item.x = newX;  // Directly update position in the sprite data
    item.y = newY;

    e.target.style.transform = `translate(${newX}px, ${newY}px)`;
  };

  const handleMouseUp = () => {
    setDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      id={`previewsprite-${idx}`}
      key={idx}
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        transform: `translate(${item.x}px, ${item.y}px) rotate(${item.angle}deg)`,
        cursor: dragging ? "grabbing" : "grab",
        height: "120px",
        width: "120px",
        transition: "transform 0.1s ease",
      }}
    >
      <img src={item.icon} alt={`Sprite ${idx}`} />
    </div>
  );
}

export default Sprite;
