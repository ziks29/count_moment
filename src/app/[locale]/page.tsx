import { Metadata } from "next";
import { AddNew } from "@/components/AddNew";
import { EmotionTracker } from "@/components/EmotionTracker";
import { MainInfo } from "@/components/MainInfo";
import { Header } from "@/components/Header";
import { SendM } from "@/components/SendM";
import { SliderComponent } from "@/components/SliderComponent";

export const metadata: Metadata = {
  title: "CountMoment",
  description: "App where you can count moments",
};

export default function Home() {
  return (
    <>
      <Header />
      <div className="container flex-1 flex flex-col justify-evenly h-max items-center gap-4 my-2">
        <MainInfo />
        <EmotionTracker />
        <AddNew />
        <SendM />
        {/* <SliderComponent /> */}
      </div>
    </>
  );
}
