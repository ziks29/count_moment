"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { useStore } from "@/store/storage";
import {
  CheckCircle,
  Smile,
  Frown,
  Zap as LightningCharge,
  Moon,
  Angry,
  AlertCircle,
  Feather,
  Activity,
  Wind,
  Heart,
  Meh,
  Gift,
} from "lucide-react";
import { Separator } from "./ui/separator";

// Define a mapping from mood to icon
const moodIcons = {
  Happy: <Smile />,
  Sad: <Frown />,
  Excited: <LightningCharge />,
  Tired: <Moon />,
  Angry: <Angry />,
  Anxious: <AlertCircle />,
  Relaxed: <Feather />,
  Motivated: <Activity />,
  Stressed: <Wind />,
  Hopeful: <Heart />,
  Bored: <Meh />,
  Grateful: <Gift />,
};

export function EmotionTracker() {
  const {
    mood,
    setMood,
    componentsListWithOrder,
    addToComponentsListWithOrder,
  } = useStore();
  const [selected, setSelected] = useState(false); // State to manage the selection and display
  const mainRef = useRef<HTMLDivElement>(null);
  const mainRefHeight = mainRef.current?.clientHeight;

  useEffect(() => {
    if (componentsListWithOrder.EmotionTracker === undefined)
      addToComponentsListWithOrder("EmotionTracker", 2);
  }, []);

  // Explicitly defining the type for moods
  const moods: (keyof typeof moodIcons)[] = [
    "Happy",
    "Sad",
    "Excited",
    "Tired",
    "Angry",
    "Anxious",
    "Relaxed",
    "Motivated",
    "Stressed",
    "Hopeful",
    "Bored",
    "Grateful",
  ];

  const handleMoodSelection = (mood: keyof typeof moodIcons) => {
    setMood(mood); // Set the mood in the store
    setSelected(true); // Mood selected, trigger OK sign display
    setTimeout(() => {
      setSelected(false); // Reset after showing OK sign, potentially remove component from view
    }, 2000); // Display OK sign for 1.5 seconds
  };

  if (selected) {
    return (
      <div
        style={{
          height: mainRefHeight,
          order: componentsListWithOrder.EmotionTracker,
        }}
        className="flex flex-col gap-1 items-center text-center justify-center h-64 p-4 w-full bg-green-500 rounded-xl  shadow-lg"
      >
        <h1 className=" text-2xl">Thank you!</h1>
        <p
          className="
         mb-2"
        >
          Your &quot;{mood}&quot; mood has been recorded.
        </p>
        <CheckCircle className="" size={48} />
      </div>
    );
  }

  return (
    <>
      <div
        ref={mainRef}
        style={{
          order: componentsListWithOrder.EmotionTracker,
          display:
            componentsListWithOrder.EmotionTracker === 9999 ? "none" : "",
        }}
        className={`flex flex-col items-center justify-center h-full w-full rounded-xl shadow-xl p-4 transition-opacity bg-slate-200 dark:bg-slate-700/40 duration-500 text-[--tg-theme-text-color] ${
          selected ? "opacity-0" : "opacity-100"
        }`}
      >
        <p className="mb-4">How are you feeling today?</p>
        <div className="grid grid-cols-3 gap-2 w-full">
          {moods.map((mood) => (
            <Button
              key={mood}
              size="icon"
              className="gap-2 w-full py-4 aspect-square h-full bg-slate-400  dark:bg-slate-900/50 dark:text-white dark:hover:text-[--tg-theme-accent-text-color]  flex flex-col items-center  rounded-2xl transition-colors duration-300"
              onClick={() => handleMoodSelection(mood)}
            >
              {moodIcons[mood]}
              <span className="text-xs">{mood}</span>
            </Button>
          ))}
        </div>
      </div>
      {/* <Separator componentOrder={componentsListWithOrder.EmotionTracker} /> */}
    </>
  );
}
