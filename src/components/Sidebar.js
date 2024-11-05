import React, { useState } from "react";
import Sprites from "./Sprites";

export default function Sidebar() {
  const [repeatCount, setRepeatCount] = useState(10);
  const [movesCount, setMovesCount] = useState(10);
  const [gotoCount, setGotoCount] = useState({ x: 0, y: 0 });
  const [rotationCount, setRotationCount] = useState(15);

  const handleDragStart = (event) => {
    let elementID = event.currentTarget.id;

    event.dataTransfer.setData("elementID", elementID);
    event.dataTransfer.effectAllowed = "copy";

    switch (elementID) {
      case "1":
        event.dataTransfer.setData("value", movesCount);
        break;
      case "2":
        event.dataTransfer.setData("value", rotationCount);
        break;
      case "3":
        event.dataTransfer.setData("value", JSON.stringify(gotoCount));
        break;
      case "4":
        event.dataTransfer.setData("value", repeatCount);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-72 bg-gradient-to-r from-blue-100 to-indigo-200 flex-none h-full overflow-y-auto flex flex-col items-start p-4 border-r border-gray-300 shadow-xl rounded-lg">
      <div className="text-xl font-semibold text-gray-800 mb-4">Motion</div>
      
      {/* Move Block */}
      <div
        id={1}
        draggable
        onDragStart={handleDragStart}
        className="flex items-center gap-3 p-3 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors duration-300"
      >
        <span>Move</span>
        <input
          type="number"
          className="text-black w-16 rounded-sm p-1"
          id="movescount"
          value={movesCount}
          onChange={(e) => setMovesCount(e.target.value)}
        />
        <span>steps</span>
      </div>

      {/* Turn Block */}
      <div
        id={2}
        draggable
        onDragStart={handleDragStart}
        className="flex items-center gap-3 p-3 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors duration-300 mt-4"
      >
        <span>Turn</span>
        <input
          type="number"
          className="text-black w-16 rounded-sm p-1"
          id="turncount"
          min={1}
          max={360}
          value={rotationCount}
          onChange={(e) => setRotationCount(e.target.value)}
        />
        <span>degrees</span>
      </div>

      {/* Goto Block */}
      <div
        id={3}
        draggable
        onDragStart={handleDragStart}
        className="flex items-center gap-3 p-3 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors duration-300 mt-4"
      >
        <span>Goto</span>
        <div className="flex gap-3">
          <span>X</span>
          <input
            type="number"
            className="text-black w-16 rounded-sm p-1"
            id="xcount"
            value={gotoCount.x}
            onChange={(e) =>
              setGotoCount((prev) => ({ ...prev, x: e.target.value }))
            }
          />
        </div>
        <div className="flex gap-3 mt-2">
          <span>Y</span>
          <input
            type="number"
            className="text-black w-16 rounded-sm p-1"
            id="ycount"
            value={gotoCount.y}
            onChange={(e) =>
              setGotoCount((prev) => ({ ...prev, y: e.target.value }))
            }
          />
        </div>
      </div>

      {/* Repeat Block */}
      <div
        id={4}
        draggable
        onDragStart={handleDragStart}
        className="flex items-center gap-3 p-3 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors duration-300 mt-4"
      >
        <span>Repeat</span>
        <input
          type="number"
          className="text-black w-16 rounded-sm p-1"
          id="repeatcount"
          value={repeatCount}
          onChange={(e) => setRepeatCount(e.target.value)}
        />
        <span>times</span>
      </div>

      {/* Sprites Component */}
      <Sprites />
    </div>
  );
}
