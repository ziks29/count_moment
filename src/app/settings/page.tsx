"use client";
import { useBackButton } from "@tma.js/sdk-react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/storage";
import { ArrowBigDown, ArrowBigUp, Trash2, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Settings() {
  const { componentsListWithOrder, adjustComponentOrder, lastComponentOrder } =
    useStore();
  const backButton = useBackButton();
  const router = useRouter();
  backButton.on("click", () => {
    router.back();
  });
  backButton.show();

  useEffect(() => {
    console.log(componentsListWithOrder, lastComponentOrder);
  }, [componentsListWithOrder, lastComponentOrder]);

  // Filter out active components and sort them by their order
  const activeComponents = Object.entries(componentsListWithOrder)
    .filter(([_, order]) => order !== 9999)
    .sort((a, b) => a[1] - b[1]);

  // Get the orders of the first and last active components for comparison
  const firstOrder =
    activeComponents.length > 0 ? activeComponents[0][1] : null;
  const lastOrder =
    activeComponents.length > 0
      ? activeComponents[activeComponents.length - 1][1]
      : null;

  return (
    <div className="text-[--tg-theme-text-color] flex flex-col h-max ">
      <h1 className=" text-center py-2 text-xl">Settings</h1>

      <section className="flex flex-col  h-max dark:bg-slate-700/40 bg-slate-200 text-[--tg-theme-text-color] w-full gap-1 pb-2  shadow-xl">
        <div style={{ order: -9999 }} className="p-2">
          Change order of components:
        </div>
        {Object.keys(componentsListWithOrder).map((component) => (
          <div
            key={component}
            className="flex justify-between items-center py-1 px-2  bg-[--tg-theme-secondary-background-color]  shadow-lg dark:bg-slate-700/40 dark:border-slate-600/50 transition-colors duration-300"
            style={{ order: componentsListWithOrder[component] }}
          >
            <div className="text-center align-middle">{component}</div>
            <div className="flex gap-2">
              {/* Only show buttons if there are more than one active component */}
              {activeComponents.length > 1 &&
                componentsListWithOrder[component] !== 9999 && (
                  <>
                    {componentsListWithOrder[component] !== firstOrder && (
                      <Button
                        variant={"outline"}
                        size={"icon"}
                        onClick={() => adjustComponentOrder(component, -1)}
                      >
                        <ArrowBigUp />
                      </Button>
                    )}
                    {componentsListWithOrder[component] !== lastOrder && (
                      <Button
                        variant={"outline"}
                        size={"icon"}
                        onClick={() => adjustComponentOrder(component, 1)}
                      >
                        <ArrowBigDown />
                      </Button>
                    )}
                  </>
                )}

              <Button
                variant={"outline"}
                size={"icon"}
                onClick={() => adjustComponentOrder(component, 9999)}
                disabled={
                  activeComponents.length === 1 &&
                  componentsListWithOrder[component] !== 9999
                }
              >
                {componentsListWithOrder[component] === 9999 ? (
                  <PlusCircle />
                ) : (
                  <Trash2 />
                )}
              </Button>
            </div>
          </div>
        ))}
        {Object.values(componentsListWithOrder).includes(9999) && (
          <h1 className=" text-center py-2 order-[9000]">
            Disabled components
          </h1>
        )}
      </section>
    </div>
  );
}
