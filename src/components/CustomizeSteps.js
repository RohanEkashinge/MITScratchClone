import { useAtom } from "jotai";
import React from "react";
import { char1StepsAtom, char2StepsAtom } from "../../util/atoms";

function CustomizeSteps() {
  const [char1Steps, setChar1Steps] = useAtom(char1StepsAtom);
  const [char2Steps, setChar2Steps] = useAtom(char2StepsAtom);

  return (
    <div className="flex flex-col pl-2 gap-4 h-full overflow-auto">
      <h1>Customize the steps for both the characters</h1>
      <div className="p-2 bg-blue-500 w-80 rounded-md">
        <label htmlFor="char-1-input" className="text-white">
          Char 1 Steps{" "}
        </label>
        <input
          id="char-1-input"
          type="number"
          min={1}
          className="text-black w-12 rounded-sm px-1"
          value={char1Steps}
          onChange={(e) => setChar1Steps(e.target.value)}
        />
      </div>
      <div className="p-2 bg-blue-500 w-80 rounded-md">
        <label htmlFor="char-1-input" className="text-white">
          Char 1 Steps{" "}
        </label>
        <input
          id="char-1-input"
          type="number"
          min={1}
          className="text-black w-12 rounded-sm px-1"
          value={char2Steps}
          onChange={(e) => setChar2Steps(e.target.value)}
        />
      </div>
    </div>
  );
}

export default CustomizeSteps;
