import React from "react";
import Icon from "./Icon";
import dragItems from "../../util/DragItems";
import { useAtom } from "jotai";
import { spritesAtom, activeSpriteAtom } from "../../util/atoms";

export default function MidArea() {
  const [sprites, setSprites] = useAtom(spritesAtom);
  const [activeSprite, setActiveSprite] = useAtom(activeSpriteAtom);

  const handleDrag = (e) => {
    let actionID = e.dataTransfer.getData("elementID");
    let value = e.dataTransfer.getData("value");

    let action = structuredClone(dragItems[parseInt(actionID) - 1]);

    if (actionID == 3) {
      value = JSON.parse(value);
      action.Xvalue = parseInt(value.x);
      action.Yvalue = parseInt(value.y);
    } else {
      action.value = parseInt(value);
    }

    let tempState = sprites.map((item, idx) => {
      if (activeSprite == idx) {
        return {
          ...item,
          actions: item.actions.concat(action),
        };
      }

      return item;
    });

    setSprites(tempState);
  };

  const handleDelete = (itemIdx) => {
    let tempState = sprites.map((item, idx) => {
      if (activeSprite == idx) {
        return {
          ...item,
          actions: item.actions.filter(
            (action, actionIndex) => actionIndex != itemIdx
          ),
        };
      }

      return item;
    });

    setSprites(tempState);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrag}
      onDragOver={handleDragOver}
      className="flex-1 pl-2 h-full overflow-auto"
    >
      {sprites.length >= 1 &&
        sprites[activeSprite].actions.map((item, idx) => {
          return (
            <div
              key={idx}
              className={`relative flex flex-row flex-wrap rounded ${item.color} text-white px-2 py-1 my-2 text-sm w-6/12 cursor-pointer`}
            >
              <div
                className="absolute top-2 right-1 text-red-500 text-xs cursor-pointer hover:text-gray-300"
                onClick={(e) => handleDelete(idx)}
              >
                <Icon name={"trash"} size={15} />
              </div>

              {item.text}
              {item.value
                ? item.value
                : `X : ${item.Xvalue} Y : ${item.Yvalue}`}
              {item.suffix}
            </div>
          );
        })}
    </div>
  );
}
