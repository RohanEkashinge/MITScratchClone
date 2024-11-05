import React from "react";
import { useAtom } from "jotai";
import { spritesAtom } from "../../util/atoms"; // Ensure spritesAtom is correctly imported
import colors from "tailwindcss/colors";

function Header() {
  const [sprites, setSprites] = useAtom(spritesAtom);

  // Function to run the sprite actions
  const handleRun = async () => {
    sprites.forEach((sprite, idx) => {
      executeSpriteActions(sprite, idx);
    });
  };

  // Function to execute sprite actions (move, rotate, goto, etc.)
  const executeSpriteActions = async (sprite, spriteIdx) => {
    let newX = sprite.x;
    let newY = sprite.y;
    let newAngle = sprite.angle;

    const executeAction = async (action) => {
      await new Promise((resolve) => {
        setTimeout(() => {
          switch (action.type) {
            case "move":
              newX += action.value;
              break;
            case "rotate":
              newAngle += action.value;
              break;
            case "goto":
              newX += action.Xvalue;
              newY += action.Yvalue;
              break;
            case "repeat":
              break;
          }
          setSprites((prevSprites) =>
            prevSprites.map((s, idx) =>
              idx === spriteIdx
                ? { ...s, x: newX, y: newY, angle: newAngle }
                : s
            )
          );
          resolve();
        }, 500); // 500ms delay between actions
      });
    };

    const executeActions = async (actions) => {
      for (let index = 0; index < actions.length; index++) {
        const action = actions[index];

        if (action.type === "repeat") {
          for (let j = 0; j < action.value; j++) {
            for (let action of actions) {
              await executeAction(action);
            }
          }
          break;
        } else {
          await executeAction(action);
        }
      }
    };

    await executeActions(sprite.actions);
  };

  // Function to reset the sprite positions and angles
  const handleReset = () => {
    setSprites((prevSprites) =>
      prevSprites.map((s) => {
        return { ...s, x: 0, y: 0, angle: 0 };
      })
    );
  };

  return (
    <div className="bg-gradient-to-r from-teal-300 to-blue-400 text-white py-4 px-6 shadow-lg rounded-b-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold" style={{ color: 'black' }}>MIT Scratch Clone</h1>

        {/* Button Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleRun}
            className="px-6 py-2 rounded-lg text-sm font-medium bg-green-500 hover:bg-green-400 transition duration-300"
          >
            Run
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2 rounded-lg text-sm font-medium bg-red-500 hover:bg-red-400 transition duration-300"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
