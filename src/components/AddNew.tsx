"use client";
import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Separator } from "./ui/separator";
import { useStore } from "@/store/storage";
import { useEffect } from "react";

export function AddNew() {
  const { componentsListWithOrder, addToComponentsListWithOrder } = useStore();

  useEffect(() => {
    if (componentsListWithOrder.AddNew === undefined)
      addToComponentsListWithOrder("AddNew", 3);
  }, []);

  return (
    <>
      <div
        className="flex flex-col items-center justify-center w-full rounded-xl dark:bg-slate-700/40 bg-slate-200 p-2 "
        style={{
          order: componentsListWithOrder.AddNew,
          display: componentsListWithOrder.AddNew === 9999 ? "none" : "",
        }}
      >
        <p>Add your next goal:</p>
        <Button variant="outline" size="icon" className="mt-2">
          <Plus className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
        </Button>
      </div>
      {/* <Separator componentOrder={componentsListWithOrder.AddNew} /> */}
    </>
  );
}
