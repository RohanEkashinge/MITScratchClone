import { atom } from "jotai";

// Sprite State
export const spritesAtom = atom([
  {
    icon: "/cat.svg",
    x: 0,
    y: 0,
    angle: 0,
    actions: [],
  },
]);

export const activeSpriteAtom = atom(0);



// Add derived atom for sprite count (just an example)
export const spriteCountAtom = atom((get) => get(spritesAtom).length);

// Derived atoms could be used here to manage updates to other complex states
export const activeSpriteDetailsAtom = atom((get) => {
  const sprites = get(spritesAtom);
  const activeSpriteIndex = get(activeSpriteAtom);
  return sprites[activeSpriteIndex];
});
