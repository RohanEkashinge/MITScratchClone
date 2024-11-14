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

export const heroFeatureTriggerAtom = atom(false);
export const char1StepsAtom = atom(250);
export const char2StepsAtom = atom(250);
