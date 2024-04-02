"use client";
import { cn } from "@/lib/utils";
import { useUserStore } from "../store/userStorage";
import { useEffect, forwardRef } from "react";

export const defaultOrder = {
  MI: 1,
  ET: 2,
  AN: 3,
  SM: 4,
};

export const BasicComponent = forwardRef(
  (
    {
      name,
      children,
      className,
      style,
    }: Readonly<{
      name: string;
      children: React.ReactNode;
      className?: string;
      style?: React.CSSProperties;
    }>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const { componentsListWithOrder, addToComponentsListWithOrder } =
      useUserStore();

    useEffect(() => {
      console.log(
        //This should be as componentListWithOrder.name but it's not working
        componentsListWithOrder[name],
        name
      );
      // If name is not in the key of componentsListWithOrder, add it with last available order
      if (!componentsListWithOrder[name])
        addToComponentsListWithOrder(
          name,
          defaultOrder[name as keyof typeof defaultOrder]
        );
    }, [componentsListWithOrder, name, addToComponentsListWithOrder]);

    return (
      <div
        className={cn(
          " text-[--tg-theme-text-color] w-full rounded-lg shadow-xl ",
          className ?? ""
        )}
        ref={ref}
        style={{
          order: componentsListWithOrder[name],
          display: componentsListWithOrder[name] === 9999 ? "none" : "",
          ...style,
        }}
      >
        {componentsListWithOrder[name] === 9999 ? null : children}
      </div>
    );
  }
);

BasicComponent.displayName = "BasicComponent"; // Add display name to the component
