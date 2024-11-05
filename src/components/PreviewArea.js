import React, { useRef } from "react";

import { spritesAtom } from "../../util/atoms";
import { useAtom } from "jotai";
import Sprite from "./Sprite";

export default function PreviewArea() {
  const previewAreaRef = useRef();

  const [sprites, setSprites] = useAtom(spritesAtom);

  return (
    <div className="flex-none h-full overflow-y-auto p-2" ref={previewAreaRef}>
      {sprites.map((item, idx) => {
        return <Sprite key={idx} idx={idx} item={item} />;
      })}
    </div>
  );
}
