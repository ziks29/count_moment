"use client";
import React, { useEffect, useState } from "react";
import { BasicComponent } from "@/components/BasicComponent";
import { useInitData } from "@tma.js/sdk-react";
import { useScopedI18n } from "@/locales/client";

export function MainInfo() {
  const initData = useInitData();
  const [greeting, setGreeting] = useState("");
  const [userName, setUserName] = useState("User"); // Replace with actual user name
  const t = useScopedI18n("mainInfo");

  useEffect(() => {
    let username;
    if (initData?.user?.username) {
      username = initData?.user?.username;
    } else {
      username = initData?.user?.firstName;
    }

    // Arrays of greetings for each time of day
    const morningGreetings = [t("morning.1"), t("morning.2"), t("morning.3")];
    const afternoonGreetings = [t("afternoon.1"), t("afternoon.2")];
    const eveningGreetings = [t("evening.1"), t("evening.2"), t("evening.3")];
    const nightGreetings = [t("night.1"), t("night.2")];

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
      <BasicComponent
        name="MI"
        className="dark:bg-slate-700/40 bg-slate-200 text-[--tg-theme-text-color] w-full p-6  rounded-lg shadow-xl"
      >
        <h1 className="text-xl md:text-2xl">
          {greeting}, {userName}.
        </h1>
        <p className="mt-2">
          <span className="font-bold">{daysLeft + t("days")}</span> {t("and")}
          {hoursLeft === 0 ? (
            t("lessThanAnHour")
          ) : (
            <span className="font-bold">{hoursLeft + t("hours")}</span>
          )}{" "}
          {t("leftIn") + currentDate.getFullYear()}.
        </p>
        <p className="mt-2">
          {t("tasks", { count: <strong>0</strong> })}
          {/* Replace with actual task count */}
        </p>
        <div className="relative w-full h-4 bg-[--tg-theme-text-color] rounded-lg overflow-hidden mt-2">
          <div
            className="absolute top-0 left-0 h-full bg-[--tg-theme-accent-text-color] rounded-lg transition-all duration-500 ease-in-out"
            style={{ width: `${yearProgress}%` }}
          ></div>
        </div>

        <p className="mt-2 text-sm text-gray-400">
          {t("yearProgress", { progress: yearProgress })}
        </p>
      </BasicComponent>
      {/* <Separator componentOrder={componentsListWithOrder.MainInfo} /> */}
    </>
  );
}
