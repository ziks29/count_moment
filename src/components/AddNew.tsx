"use client";
import React from "react";
import { Button } from "./ui/button";
import {
  Plus,
  ListTodo,
  Goal,
  Star,
  Timer,
  ChevronLeft,
  IterationCw,
} from "lucide-react";
import { BasicComponent } from "./BasicComponent";
//Transition
import { useScopedI18n, useI18n } from "@/locales/client";
import { Slider, Slide } from "./Slider";
import { cn } from "@/lib/utils";

const commands = ["addMomemt", "addTodo", "addTracker", "addGoal", "addTimer"];
const commandsText = {
  addMomemt: "New Moment",
  addTodo: "New Todo",
  addTracker: "New Tracker",
  addGoal: "New Goal",
  addTimer: "New Timer",
};

const commandsIcons = {
  addTodo: <ListTodo />,
  addTracker: <IterationCw />,
  addGoal: <Goal />,
  addMomemt: <Star />,
  addTimer: <Timer />,
};

const commandsSlide = {
  addMomemt: 1,
  addTodo: 2,
  addNext: 3,
  addGoal: 4,
  addTimer: 5,
};

export function AddNew() {
  const t = useScopedI18n("addNext");
  const [slide, setSlide] = React.useState<number>(0);
  return (
    <BasicComponent
      name="AN"
      className="w-full rounded-xl dark:bg-slate-700/40 bg-slate-200 p-2 "
    >
      <Slider
        trigger={slide}
        className="w-full transition-all"
        currentMode="extra"
      >
        <Slide
          slideId={0}
          className="flex flex-col items-center justify-center gap-2 "
        >
          <p>{t("title")}</p>
          {/* 3 col grid */}
          <div className={cn("grid grid-cols-2 gap-2 w-full")}>
            {commands.map((command, index) => (
              <Button
                key={index}
                size="icon"
                variant={"outline"}
                onClick={() => {
                  setSlide(
                    commandsSlide[command as keyof typeof commandsSlide]
                  );
                }}
                className={cn(
                  "w-full rounded-2xl gap-2 flex items-center justify-center",
                  //Take both grid cols
                  command === "addMomemt" && "col-span-2"
                )}
              >
                {commandsIcons[command as keyof typeof commandsIcons]}
                <div className="">
                  {commandsText[command as keyof typeof commandsText]}
                </div>
              </Button>
            ))}
          </div>
        </Slide>
        {/* Add moment slide */}
        <Slide slideId={1} className="h-52 gap-2 flex flex-col">
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
            <p>Add moment</p>
          </div>
          <textarea
            className="w-full h-60 rounded-lg p-2 justify-items-stretch  text-black dark:text-white dark:bg-slate-700/40 bg-slate-200 outline-none resize-none"
            placeholder="Write here..."
          ></textarea>
          <Button variant="default">Save moment</Button>
        </Slide>
        {/* Add TODO slide */}
        <Slide slideId={2} className="h-52 gap-2 flex flex-col">
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
            <p>Add new todo list</p>
          </div>
          <form action=""></form>
        </Slide>
      </Slider>
    </BasicComponent>
  );
}
