"use client";
import { Slider, Slide } from "@/components/Slider";
import { useState } from "react";
import { BasicComponent } from "./BasicComponent";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SliderComponent() {
  const [slide, setSlide] = useState<number>(0);

  return (
    <BasicComponent
      name="SC"
      className="flex flex-col items-center overflow-hidden gap-4 p-2"
    >
      <Slider
        trigger={slide}
        className={cn(
          " bg-slate-600/40 rounded-xl transition-opacity transform-gpu"
        )}
      >
        <Slide slideId={0} className="h-16 flex justify-center items-center">
          <p>Slide 1</p>
        </Slide>
        <Slide slideId={1} className="justify-center items-center flex">
          <p>Slide 2</p>
        </Slide>
        <Slide slideId={2} className="justify-center items-center flex">
          <p>Slide 3</p>
        </Slide>
        <Slide slideId={3} className="justify-center items-center flex">
          <p>Slide 4</p>
        </Slide>
        <Slide slideId={4} className="justify-center items-center flex">
          <p>Slide 5</p>
        </Slide>
      </Slider>
      <Button onClick={() => setSlide((prev) => (prev + 1) % 5)}>
        Slide 1
      </Button>
    </BasicComponent>
  );
}
