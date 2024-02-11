"use client";
import React, { useEffect, useState } from "react";
import { useStore } from "@/store/storage";
import { useInitData } from "@tma.js/sdk-react";
import { Separator } from "./ui/separator";

export function MainInfo() {
  const initData = useInitData();
  const { moodCounter, componentsListWithOrder, addToComponentsListWithOrder } =
    useStore(); // Assuming tasks is an array or similar structure
  const [greeting, setGreeting] = useState("");
  const [userName, setUserName] = useState("User"); // Replace with actual user name

  useEffect(() => {
    console.log(componentsListWithOrder);
    if (componentsListWithOrder.MainInfo === undefined)
      addToComponentsListWithOrder("MainInfo", 1);
  }, [addToComponentsListWithOrder, componentsListWithOrder.MainInfo]);

  useEffect(() => {
    let username;
    if (initData?.user?.username) {
      username = initData?.user?.username;
    } else {
      username = initData?.user?.firstName;
    }

    // Arrays of greetings for each time of day
    const morningGreetings = [
      "Have a Great Morning",
      "Rise and Shine",
      "Good Morning",
    ];
    const afternoonGreetings = ["Good Afternoon", "Sunny Day"];
    const eveningGreetings = ["Quiet Eve", "Good Evening", "Peaceful Evening"];
    const nightGreetings = ["Rest Well", "Sweet Dreams"];

    const hour = new Date().getHours();

    // Function to randomly select a greeting
    const getRandomGreeting = (greetings: string[]) =>
      greetings[Math.floor(Math.random() * greetings.length)];

    let greet;
    if (hour >= 22 || hour < 4) {
      // From 10 PM to 4 AM
      greet = getRandomGreeting(nightGreetings);
    } else if (hour < 12) {
      // From 4 AM to 12 PM
      greet = getRandomGreeting(morningGreetings);
    } else if (hour < 18) {
      // From 12 PM to 6 PM
      greet = getRandomGreeting(afternoonGreetings);
    } else {
      // From 6 PM to 10 PM
      greet = getRandomGreeting(eveningGreetings);
    }

    setGreeting(greet);
    setUserName(username || "User");
  }, []);

  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const endOfYear = new Date(currentDate.getFullYear(), 11, 31, 23, 59, 59);
  const elapsed = currentDate.getTime() - startOfYear.getTime();
  const total = endOfYear.getTime() - startOfYear.getTime();
  const progress = ((elapsed / total) * 100).toFixed(5) as unknown as number;
  const [yearProgress, setYearProgress] = useState<number>(progress);

  const daysLeft = Math.floor(
    (endOfYear.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const hoursLeft = Math.floor(
    ((endOfYear.getTime() - currentDate.getTime()) % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
  );
  // set year progress every 1 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const elapsed = currentDate.getTime() - startOfYear.getTime();
      const progress = -(-(elapsed / total) * 100).toFixed(5);
      setYearProgress(Number(progress));
    }, 1000); // Or 1500ms, but the key is recalculating progress inside here
    return () => clearInterval(interval);
  }, [startOfYear, total]);

  return (
    <>
      <div
        className="dark:bg-slate-700/40 bg-slate-200 text-[--tg-theme-text-color] w-full p-6  rounded-lg shadow-xl"
        style={{
          order: componentsListWithOrder.MainInfo,
          display: componentsListWithOrder.MainInfo === 9999 ? "none" : "",
        }}
      >
        <h1 className="text-xl md:text-2xl">
          {greeting}, {userName}.
        </h1>
        <p className="mt-2">
          <span className="font-bold">{daysLeft} d.</span> and{" "}
          {hoursLeft === 0 ? (
            "less than an hour"
          ) : (
            <span className="font-bold">{hoursLeft} h.</span>
          )}{" "}
          left in {currentDate.getFullYear()}.
        </p>
        <p className="mt-2">
          You have currently <span className="font-bold">{moodCounter}</span>{" "}
          tasks.
        </p>
        <div className="relative w-full h-4 bg-[--tg-theme-text-color] rounded-lg overflow-hidden mt-2">
          <div
            className="absolute top-0 left-0 h-full bg-[--tg-theme-accent-text-color] rounded-lg transition-all duration-500 ease-in-out"
            style={{ width: `${yearProgress}%` }}
          ></div>
        </div>

        <p className="mt-2 text-sm text-gray-400">
          Year Progress: {yearProgress}%
        </p>
      </div>
      {/* <Separator componentOrder={componentsListWithOrder.MainInfo} /> */}
    </>
  );
}
