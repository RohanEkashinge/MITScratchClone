import React from "react";
import Icon from "./Icon";
import { spritesAtom, activeSpriteAtom } from "../../util/atoms";
import { useAtom } from "jotai";

function Sprites() {
  const [sprites, setSprites] = useAtom(spritesAtom);
  const [activeSprite, setActiveSprite] = useAtom(activeSpriteAtom);

  const handleUpload = (event) => {
    let file = event.target.files[0];
    if (!file) return;

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
    const elementId = event.currentTarget.id.split("-")[1];
    setActiveSprite(Number(elementId));
  };

  const handleDelete = (event) => {
    const confirmed = window.confirm("Are you sure you want to delete this sprite?");
    if (!confirmed) return;

    let parent = event.currentTarget.parentNode;
    let id = parent.id.split("-")[1];
    setSprites(sprites.filter((_, idx) => idx !== parseInt(id)));

    // Select a new random sprite or set to null
    const getRandomIdx = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    setActiveSprite(sprites.length > 0 ? getRandomIdx(0, sprites.length - 1) : null);

    event.stopPropagation();
  };

  return (
    <>
      <div className="font-bold text-xl">Sprites Manager</div>
      <div className="flex flex-col gap-4 mt-4">
        {sprites.map((item, idx) => (
          <div
            key={idx}
            id={`sprite-${idx}`}
            onClick={handleManage}
            className={`relative flex flex-col gap-2 rounded-lg shadow-lg p-4 items-center justify-center ${activeSprite === idx ? "border-2 border-green-600" : ""} hover:bg-gray-100 transition duration-200 ease-in-out`}
          >
            <div
              className="absolute top-0 right-0 cursor-pointer p-2 bg-red-500 text-white rounded-full"
              onClick={handleDelete}
            >
              <Icon name="trash" size={15} />
            </div>
            <img src={item.icon} alt={`Sprite ${idx}`} className="w-24 h-24 object-cover" />
            <button className="p-2 bg-blue-500 text-white rounded-sm mt-2">
              Manage
            </button>
          </div>
        ))}

        {/* Add New Sprite Block */}
        <div className="flex flex-col gap-2 rounded-md border-4 border-dashed border-red-300 p-4 items-center justify-center">
          <Icon name="id-badge" size={50} className="text-black" />
          <label className="cursor-pointer p-2 bg-blue-500 text-white rounded-sm" htmlFor="spriteInput">
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
