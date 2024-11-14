import React from "react";

function Sprite({ item, idx }) {
  let element = null;
  let clientX = 0;
  let clientY = 0;
  let newClientX = 0;
  let newClientY = 0;

  const handleMouseDown = (e) => {
    e.preventDefault();
    element = e.currentTarget;

    clientX = e.clientX;
    clientY = e.clientY;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();

    newClientX = clientX - e.clientX;
    newClientY = clientY - e.clientY;

    clientX = e.clientX;
    clientY = e.clientY;

    element.style.top = element.offsetTop - newClientY + "px";
    element.style.left = element.offsetLeft - newClientX + "px";
  };

  const handleMouseUp = () => {
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
        transition: "transform 0.3s ease",
        cursor: "grab",
        height: "120px",
        width: "120px",
      }}
    >
      <img src={item.icon} />
    </div>
  );
}

export default Sprite;
