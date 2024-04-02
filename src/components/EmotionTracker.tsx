"use client";
import React, { useState, useRef, useMemo, useCallback } from "react";
import { Button } from "./ui/button";
import { BasicComponent } from "./BasicComponent";
import { useMoodStore } from "@/store/moodStorage";
import {
  CheckCircle,
  Smile,
  Frown,
  Angry,
  Trash,
  Activity,
  Heart,
  Gift,
  Skull,
  HeartHandshake,
  ChevronLeft,
} from "lucide-react";
import { MoodType } from "@prisma/client";
import { useScopedI18n } from "@/locales/client";
import { Slider, Slide } from "@/components/Slider";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/userStorage";
import { addMoodToUser } from "@/lib/actions";

// Define a mapping from mood to icon
const moodIcons = {
  Joy: <Smile />,
  Sadness: <Frown />,
  Anger: <Angry />,
  Fear: <Skull />,
  Trust: <HeartHandshake />,
  Disgust: <Trash />,
  Surprise: <Gift />,
  Anticipation: <Activity />,
  Love: <Heart />,
};

export function EmotionTracker() {
  const { latestMood, addMood } = useMoodStore();
  const [slide, setSlide] = useState<number>(0); // State to manage the slide index
  const [note, setNote] = useState<string | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const t = useScopedI18n("emotionTracker");
  const tMoods = useScopedI18n("emotionTracker.emotions");

  // Explicitly defining the type for moods
  const moods = useMemo<MoodType[]>(() => {
    return [
      "Joy",
      "Sadness",
      "Anger",
      "Fear",
      "Trust",
      "Disgust",
      "Surprise",
      "Anticipation",
      "Love",
    ];
  }, []);

  const handleMoodSelection = useCallback(
    (mood: MoodType) => {
      addMood(mood); // Set the mood in the store
      setSlide(1); // Move to the next slide
    },
    [addMood]
  );

  return (
    <>
      <BasicComponent
        name="ET"
        ref={mainRef}
        //If current componentHeight is smaller than ref, than use ref and save it to componentHeight
        className={cn(
          "h-full w-full rounded-xl shadow-xl p-4 transition-opacity  duration-500 text-[--tg-theme-text-color]",
          "dark:bg-slate-700/40 bg-slate-200"
        )}
      >
        <Slider trigger={slide} className="w-full h-full">
          <Slide slideId={0}>
            <p className="mb-4">{t("title")}</p>
            <div className="grid grid-cols-3 gap-2 w-full">
              {moods.map((mood) => (
                <Button
                  key={mood}
                  size="icon"
                  className="gap-2 w-full py-4 aspect-square h-full bg-slate-400  dark:bg-slate-900/50 dark:text-white dark:hover:text-[--tg-theme-accent-text-color]  flex flex-col items-center  rounded-2xl transition-colors duration-300"
                  onClick={() => handleMoodSelection(mood)}
                >
                  {moodIcons[mood]}
                  <span className="text-xs">{tMoods(mood)}</span>
                </Button>
              ))}
            </div>
          </Slide>
          <Slide slideId={1}>
            <div className="grow flex flex-col gap-4 h-full w-full">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={"outline"}
                  onClick={() => {
                    setSlide(0);
                  }}
                >
                  <ChevronLeft />
                </Button>
                <h1>{t("input.label")}</h1>
              </div>
              <textarea
                value={note as string}
                onChange={(e) => setNote(e.target.value)}
                className="w-full h-full rounded-lg p-2 justify-items-stretch  text-black dark:text-white dark:bg-slate-700/40 bg-slate-200 outline-none resize-none"
                placeholder={t("input.placeholder")}
              />
              <Button
                disabled={slide === 2}
                onClick={async () => {
                  await addMoodToUser(
                    latestMood as MoodType,
                    useUserStore.getState().userId,
                    note as string
                  ).then(() => {
                    setTimeout(() => {
                      setSlide(2);
                      console.log("Note: ", note);
                    }, 50);
                    setTimeout(() => {
                      setNote(null);
                      setSlide(0);
                    }, 3000);
                  });
                }}
                className={note ? "" : "dark:bg-emerald-300"}
              >
                {note ? t("input.submit") : t("input.skip")}
              </Button>
            </div>
          </Slide>
          <Slide
            slideId={2}
            className="flex flex-col items-center h-full my-auto justify-center text-center"
          >
            <div className="grow flex flex-col items-center gap-4">
              <h1 className=" text-2xl">{t("ty")}</h1>
              <p className="mb-2">
                {t("post", {
                  latestMood: (
                    <strong>
                      &quot;{tMoods(latestMood as MoodType)}&quot;
                    </strong>
                  ),
                })}
              </p>
              {/* # for perfect and beautiful ok green color */}

              <CheckCircle color="#50C878" size={64} />
            </div>
          </Slide>
        </Slider>
      </BasicComponent>
      {/* <Separator componentOrder={componentsListWithOrder.EmotionTracker} /> */}
    </>
  );
}
