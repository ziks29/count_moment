"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  children: React.ReactNode;
  trigger: number; // Changed from boolean to number to directly control the slide index
  className?: string;
  currentMode?: "normal" | "extra";
}

/**
 * Slider component
 * Should accept all children and render them in a slider component
 * @param children - The children to render in the slider
 * @param trigger - The trigger to change the slide
 * @param className - The class name to apply to the slider
 * @returns The slider component
 *
 */
export const Slider: React.FC<SliderProps> = ({
  children,
  trigger,
  className,
  currentMode = "normal",
}) => {
  const [currentSlide, setCurrentSlide] = useState(trigger);
  const [isAnimatingInitial, setIsAnimatingInitial] = useState(false);
  const slideIdsRef = useRef<Set<number>>(new Set());
  const sliderRef = useRef<HTMLDivElement>(null);
  const slides = useMemo(() => {
    // Clear previous slideIds
    slideIdsRef.current.clear();

    const filteredSlides = React.Children.toArray(children).filter((child) => {
      if (
        React.isValidElement(child) &&
        child.type === Slide &&
        child.props.slideId !== undefined
      ) {
        // Here we populate slideIdsRef with current slides' ids
        if (slideIdsRef.current.has(child.props.slideId)) {
          console.error(
            `Duplicate slideId ${child.props.slideId} found. Ensure the slideId is unique.`
          );
          return false; // This skips adding the slide if its id is already present
        }
        slideIdsRef.current.add(child.props.slideId);
        return true;
      }
      return false;
    });

    return filteredSlides;
  }, [children]); // Depend on children so it recalculates when they change

  useEffect(() => {
    // If the trigger is the same as the current slide, do nothing
    const nextId = Array.from(slideIdsRef.current).findIndex(
      (id) => id === trigger
    );
    if (trigger == currentSlide) {
      if (sliderRef.current) {
        sliderRef.current.scrollLeft = nextId * sliderRef.current.clientWidth;
      }
      return;
    }

    //Check if trigger exists in the slideIds set
    if (!slideIdsRef.current.has(trigger)) {
      // Error for nextjs
      console.error(
        `Slide with slideId ${trigger} not found. Ensure the slideId is valid.`
      );
      return;
    }
    if (trigger >= 0) {
      setIsAnimatingInitial(true);
      setTimeout(() => {
        setCurrentSlide(trigger);
        if (sliderRef.current) {
          sliderRef.current.scrollLeft = nextId * sliderRef.current.clientWidth;
        }
      }, 50);
    }
  }, [trigger, currentSlide, children, slideIdsRef]);

  const [sliderHeight, setSliderHeight] = useState<number>(0);
  useEffect(() => {
    if (currentMode === "extra" && sliderRef.current) {
      //Height of active slide
      const activeSlide = sliderRef.current.querySelector(
        `[data-slide-id="${currentSlide}"]`
      );
      if (activeSlide) {
        setSliderHeight(activeSlide.clientHeight);
      }
    }
  }, [currentMode, sliderRef, currentSlide]);

  return (
    <div
      className={cn(
        className,
        isAnimatingInitial && "animate-opacity-in-out",
        " w-full  gap-4 overflow-hidden snap-x snap-mandatory align-top",
        currentMode === "normal" && "flex flex-row",
        currentMode === "extra" && " relative",
        currentMode === "extra" &&
          `transition-height duration-500 ease-in overflow-hidden`
      )}
      style={{
        height:
          (currentMode === "extra" && isAnimatingInitial && sliderHeight) ||
          "auto",
      }}
      key={trigger}
      ref={sliderRef}
    >
      {slides.map((child) => {
        if (React.isValidElement(child) && currentMode === "normal") {
          return child;
        } else if (React.isValidElement(child) && currentMode === "extra") {
          return React.cloneElement(child, {
            className: cn(
              (child.props as any).className,
              (child.props as any).slideId === currentSlide && "visible",
              (child.props as any).slideId !== currentSlide && "hidden"
            ),
          } as React.HTMLAttributes<HTMLElement>);
        }
        return null;
      })}
    </div>
  );
};

interface SlideProps {
  children: React.ReactNode;
  slideId: number;
  className?: string;
}

export const Slide = ({ children, slideId, className }: SlideProps) => {
  return (
    <div
      className={cn(className, "shrink-0 w-full snap-center ")}
      data-slide-id={slideId}
    >
      {children}
    </div>
  );
};

Slide.displayName = "Slide"; // Add display name to the component
