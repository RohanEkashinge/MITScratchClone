import React from "react";
import { spritesAtom, heroFeatureTriggerAtom } from "../../util/atoms";
import { useAtom } from "jotai";
import { TiFlag } from "react-icons/ti";
import { FiOctagon } from "react-icons/fi";
import { globalActionsAtom } from "../../util/atoms";


function Header() {
  const [sprites, setSprites] = useAtom(spritesAtom);
  const [globalActions] = useAtom(globalActionsAtom); 
  const [heroFeatureTrigger, setHeroFeatureTrigger] = useAtom(
    heroFeatureTriggerAtom
  );

    // Function to execute global actions on each sprite
    const executeGlobalActions = async (sprite) => {
      let newX = sprite.x;
      let newY = sprite.y;
      let newAngle = sprite.angle;
  
      for (let action of globalActions) {
        switch (action.type) {
          case "move":
            newX += action.value;
            break;
          case "rotate":
            newAngle += action.value;
            break;
          case "goto":
            newX = action.Xvalue;
            newY = action.Yvalue;
            break;
          case "repeat":
            // Handle repeat logic (can be skipped for simplicity here)
            break;
          default:
            break;
        }
  
        // Update sprite state with new values
        setSprites((prevSprites) =>
          prevSprites.map((s, idx) =>
            idx === sprite.idx ? { ...s, x: newX, y: newY, angle: newAngle } : s
          )
        );
      }
    };

    const handleRunGlobalActions = () => {
      sprites.forEach((sprite) => {
        executeGlobalActions(sprite);
      });
    };

  const handleRun = async () => {
    sprites.forEach((sprite, idx) => {
      executeSpriteActions(sprite, idx);
    });
  };

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

        if (action.type == "repeat") {
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

  const handleReset = () => {
    setSprites((prevSprites) =>
      prevSprites.map((s, idx) => {
        return { ...s, x: 0, y: 0, angle: 0 };
      })
    );
  };

  const handleHeroFeature = () => {
    setHeroFeatureTrigger(!heroFeatureTrigger);
  };

  return (
    <div className="pl-2 pb-2 flex items-center justify-around">
      <h1 className="text-4xl font-bold text-black">MIT Scratch Clone</h1>
      <div className="flex  gap-2">
        <button
          onClick={handleHeroFeature}
          className="p-2 rounded-md text-white bg-blue-900 hover:bg-blue-600 cursor-pointer"
        >
          {!heroFeatureTrigger ? "Hero Feature" : "Back"}
        </button>
        {!heroFeatureTrigger && (
          <>
            <button
              onClick={handleRun}
              className="p-2 text-white rounded-md bg-green-400 hover:bg-green-600 cursor-pointer"
            >
              <TiFlag />
            </button>
            <button
              onClick={handleReset}
              className="p-2 text-white rounded-md bg-red-500 hover:bg-red-700 cursor-pointer"
            >
              <FiOctagon />

            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
