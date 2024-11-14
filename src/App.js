import React from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import Header from "./components/Header";
import { useAtom } from "jotai";
import { heroFeatureTriggerAtom } from "../util/atoms";
import HeroFeature from "./components/HeroFeature";
import CustomizeSteps from "./components/CustomizeSteps";

export default function App() {
  const [heroFeatureTrigger, setHeroFeatureTrigger] = useAtom(
    heroFeatureTriggerAtom
  );

  return (
    <div className="bg-blue-100 pt-2 font-sans">
      <Header />
      <div className="h-screen overflow-hidden flex flex-row  ">
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          {heroFeatureTrigger ? (
            <CustomizeSteps />
          ) : (
            <>
              <Sidebar /> <MidArea />{" "}
            </>
          )}
        </div>
        <div className="w-1/3 relative h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          {heroFeatureTrigger ? <HeroFeature /> : <PreviewArea />}
        </div>
      </div>
    </div>
  );
}
