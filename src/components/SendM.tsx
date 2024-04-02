"use client";
import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { BasicComponent } from "./BasicComponent";

export function SendM() {
  return (
    <>
      <BasicComponent
        name="SM"
        className="flex flex-col items-center justify-center w-full rounded-xl dark:bg-slate-700/40 bg-slate-200 p-2 "
      >
        <p>Send msg:</p>
        {/* Input with confirm button with send data to api route /api/sendMessage */}
        <input
          type="text"
          className="border-2 w-full border-gray-300 rounded-lg p-1 text-black"
          placeholder="Type your message"
        />
        <Button
          variant="outline"
          size="icon"
          className="mt-2"
          onClick={() => {
            // Send message to api route
            fetch("/api/sendMessage", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ message: "Hello world" }),
            });
          }}
        >
          <Plus className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
        </Button>
      </BasicComponent>
      {/* <Separator componentOrder={componentsListWithOrder.SendM} /> */}
    </>
  );
}
