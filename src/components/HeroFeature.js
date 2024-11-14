import { useAtom } from "jotai";
import React, { useRef } from "react";
import { char1StepsAtom, char2StepsAtom } from "../../util/atoms";

function HeroFeature() {
  const char1Ref = useRef();
  const char2Ref = useRef();
  const containerRef = useRef();

  const characterWidth = 100;

  const [char1Steps, setChar1Steps] = useAtom(char1StepsAtom);
  const [char2Steps, setChar2Steps] = useAtom(char2StepsAtom);

  const speed = 5;
  let char1Direction = 1;
  let char2Direction = -1;
  let char1Moved = 0;
  let char2Moved = 0;

  const animate = () => {
    const containerWidth = containerRef.current.clientWidth;

    const char1Rect = char1Ref.current.getBoundingClientRect();
    const char2Rect = char2Ref.current.getBoundingClientRect();

    let char1Left =
      char1Rect.left - containerRef.current.getBoundingClientRect().left;
    let char2Left =
      char2Rect.left - containerRef.current.getBoundingClientRect().left;

    if (char1Moved < char1Steps) {
      char1Left += char1Direction * speed;
      char1Moved += 5;

      if (char1Left <= 0 || char1Left >= containerWidth - characterWidth) {
        char1Direction *= -1;
        char1Left = Math.max(
          0,
          Math.min(char1Left, containerWidth - characterWidth)
        );
      }
    }

    if (char2Moved < char2Steps) {
      char2Left += char2Direction * speed;
      char2Moved += 5;

      if (char2Left <= 0 || char2Left >= containerWidth - characterWidth) {
        char2Direction *= -1;
        char2Left = Math.max(
          0,
          Math.min(char2Left, containerWidth - characterWidth)
        );
      }
    }

    // collision detecting here
    if (Math.abs(char1Left - char2Left) < characterWidth) {
      char1Direction *= -1;
      char2Direction *= -1;
    }

    char1Ref.current.style.left = `${char1Left}px`;
    char2Ref.current.style.left = `${char2Left}px`;

    if (char1Moved < char1Steps || char2Moved < char2Steps) {
      requestAnimationFrame(animate);
    }
  };

  const handleRun = () => {
    char1Moved = 0;
    char2Moved = 0;
    char1Direction = 1;
    char2Direction = -1;
    animate();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 overflow-hidden p-4 "
    >
      <h1 className="text-black mb-1">Hero Feature</h1>
      <button
        onClick={handleRun}
        className="px-4 py-2 text-white bg-blue-500 rounded mb-8 hover:bg-blue-600"
      >
        Click for animation
      </button>
      <img
        ref={char1Ref}
        width={characterWidth}
        className="absolute top-30"
        src="/cat.svg"
        alt="Character 1"
      />
      <img
        ref={char2Ref}
        width={characterWidth}
        className="absolute top-30 left-80"
        src="/catinverted.svg"
        alt="Character 2"
      />
    </div>
  );
}

export default HeroFeature;
