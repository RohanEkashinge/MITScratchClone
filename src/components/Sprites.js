import React, { useEffect } from "react";
import { useState } from "react";
import Icon from "./Icon";
import { spritesAtom, activeSpriteAtom } from "../../util/atoms";
import { useAtom } from "jotai";
import { globalActionsAtom } from "../../util/atoms";

function Sprites() {

  const [globalActions, setGlobalActions] = useAtom(globalActionsAtom);
  const [sprites, setSprites] = useAtom(spritesAtom); // Get and set sprites
  const [activeSprite, setActiveSprite] = useAtom(activeSpriteAtom);

    // Track selected global actions
    const [selectedActions, setSelectedActions] = useState([]);
    
  // Apply global actions when globalActions changes
  useEffect(() => {
    if (globalActions.length > 0) {
      console.log("Global Actions Updated:", globalActions);

      // Create a new sprites array with updated positions/angles based on actions
      const updatedSprites = sprites.map((sprite) => {
        let newX = sprite.x;
        let newY = sprite.y;
        let newAngle = sprite.angle;

        globalActions.forEach((action) => {
          switch (action.type) {
            case "move":
              newX += action.value; // Move the sprite by the specified number of steps
              break;
            case "rotate":
              newAngle += action.value; // Rotate the sprite by the specified angle
              break;
            case "goto":
              newX = action.Xvalue; // Move sprite to specific X value
              newY = action.Yvalue; // Move sprite to specific Y value
              break;
            case "repeat":
              // Handle repeat logic if necessary
              break;
            default:
              break;
          }
        });

        // Return a new sprite object with updated coordinates and angle
        return { ...sprite, x: newX, y: newY, angle: newAngle };
      });

      // Update the sprites atom with the modified sprites
      setSprites(updatedSprites);

      // Clear global actions after applying them, to prevent re-execution
      setGlobalActions([]); // Clears the actions after they are applied
    }
  }, [globalActions, sprites, setSprites, setGlobalActions]); // Trigger effect when globalActions or sprites change

  const handleUpload = (event) => {
    let file = event.target.files[0];
    let data = {
      icon: URL.createObjectURL(file),
      x: 0,
      y: 0,
      angle: 0,
      actions: [],
    };
    setSprites([...sprites, data]);
  };

  const handleManage = (event) => {
    event.preventDefault();
    let element = event.currentTarget.id;
    let id = element.split("-")[1];
    setActiveSprite(Number(id));
  };

  const handleDelete = (event) => {
    let parent = event.currentTarget.parentNode;
    let id = parent.id.split("-")[1];
    setSprites(sprites.filter((_, idx) => idx != parseInt(id)));

    const getRandomIdx = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    setActiveSprite(
      sprites.length > 0 ? getRandomIdx(0, sprites.length - 2) : null
    );
    event.stopPropagation();
  };

  return (
    <>
      <div className="font-bold">{"Sprites Manager"}</div>
      <div className="flex flex-col gap-2 mt-2">
        {sprites.map((item, idx) => {
          return (
            <div
              key={idx + 1}
              onClick={handleManage}
              id={`sprite-${idx}`}
              className={`flex w-45 relative flex-col gap-2 rounded-md shadow-xl p-4 items-center justify-center ${
                activeSprite === idx ? "border-solid border-green-600 border-2" : ""
              }`}
            >
              <div
                className="absolute top-0 right-0 cursor-pointer p-2 bg-red-500 text-white rounded-md"
                onClick={handleDelete}
              >
                <Icon name="trash" size={15} className="text-white" />
              </div>
              <div>
                <img src={item.icon} />
              </div>
              <button className="cursor-pointer p-2 bg-blue-500 rounded-sm">
                Click to manage
              </button>
            </div>
          );
        })}

        <div className="flex w-45 flex-col gap-2 rounded-md border-4 border-dashed border-red-300 p-4 items-center justify-center ">
          <div>
            <Icon name="id-badge" size={50} className="text-black" />
          </div>
          <label
            className="cursor-pointer p-2 bg-blue-500 rounded-sm"
            htmlFor="spriteInput"
          >
            Click to Add
          </label>
          <input
            onChange={handleUpload}
            id="spriteInput"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            className="hidden"
          />
        </div>
      </div>
    </>
  );
}

export default Sprites;
