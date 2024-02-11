"use client";
import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Separator } from "./ui/separator";
import { useStore } from "@/store/storage";
import { useEffect, useState } from "react";

export function SendM() {
  const { componentsListWithOrder, addToComponentsListWithOrder } = useStore();

  useEffect(() => {
    if (componentsListWithOrder.SendM === undefined)
      addToComponentsListWithOrder("SendM", 4);
  }, []);

  return (
    <>
      <div
        className="flex flex-col items-center justify-center w-full rounded-xl dark:bg-slate-700/40 bg-slate-200 p-2 "
        style={{
          order: componentsListWithOrder.SendM,
          display: componentsListWithOrder.SendM === 9999 ? "none" : "",
        }}
      >
        <p>Send msg:</p>
        {/* Input with confirm button with send data to api route /api/sendMessage */}
        <input
          type="text"
          className="border-2 w-full border-gray-300 rounded-lg p-1"
          placeholder="Type your message"
        />
        <Button variant="outline" size="icon" className="mt-2">
          <Plus className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
        </Button>
      </div>
      {/* <Separator componentOrder={componentsListWithOrder.SendM} /> */}
    </>
  );
}
