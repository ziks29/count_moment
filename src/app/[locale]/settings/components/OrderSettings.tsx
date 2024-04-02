"use client";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useUserStore } from "@/store/userStorage";
import { Button } from "@/components/ui/button";
import { RefreshCcw, EyeIcon, EyeOff } from "lucide-react";
import { useScopedI18n } from "@/locales/client";
import { defaultOrder } from "@/components/BasicComponent";

export function OrderSettings() {
  const { componentsListWithOrder, setComponentsListWithOrder } =
    useUserStore();

  const t = useScopedI18n("settings");
  const tOrder = useScopedI18n("settings.order.components");

  const [order, setOrder] = useState<string[]>([]);
  const [disabledComponents, setDisabledComponents] = useState<string[]>([]);
  const [isDisabledActivated, setIsDisabledActivated] = useState(false);
  const noElements = disabledComponents.length === 0;

  useEffect(() => {
    const sortedComponents = Object.entries(componentsListWithOrder)
      .filter(([_, value]) => value !== 9999)
      .sort((a, b) => a[1] - b[1])
      .map(([key, _]) => key);

    const disabledComponents = Object.keys(componentsListWithOrder).filter(
      (key) => componentsListWithOrder[key] === 9999
    );

    setOrder(sortedComponents);
    setDisabledComponents(disabledComponents);
  }, [componentsListWithOrder]);

  const handleDragEnd = (result: { source: any; destination: any }) => {
    const { source, destination } = result;

    // Do nothing if dropped outside the list
    if (!destination) return;

    let updatedOrder = { ...componentsListWithOrder };
    let newOrder: string[] = [...order];
    let newDisabledComponents: string[] = [...disabledComponents];

    if (source.droppableId === destination.droppableId) {
      const items = Array.from(
        source.droppableId === "components" ? newOrder : newDisabledComponents
      );
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      // Update the orders in the updatedOrder object and newOrder/newDisabledComponents arrays
      if (source.droppableId === "components") {
        newOrder = items;
        items.forEach((item, index) => {
          updatedOrder[item] = index + 1; // Update order for enabled components
        });
      } else {
        newDisabledComponents = items;
        items.forEach((item) => {
          updatedOrder[item] = 9999; // Assuming 9999 marks a component as disabled
        });
      }
    } else {
      const sourceItems = Array.from(
        source.droppableId === "components" ? newOrder : newDisabledComponents
      );
      const destItems = Array.from(
        destination.droppableId === "components"
          ? newOrder
          : newDisabledComponents
      );
      const [movedItem] = sourceItems.splice(source.index, 1);

      destItems.splice(destination.index, 0, movedItem);

      if (destination.droppableId === "components") {
        newOrder = destItems;
        destItems.forEach((item, index) => {
          updatedOrder[item] = index + 1; // Update order for newly enabled component
        });
        newDisabledComponents = sourceItems;
        sourceItems.forEach((item) => {
          updatedOrder[item] = 9999; // Keep the disabled state for the remaining items
        });
      } else {
        newOrder = sourceItems;
        sourceItems.forEach((item, index) => {
          updatedOrder[item] = index + 1; // Update order for remaining enabled components
        });
        newDisabledComponents = destItems;
        updatedOrder[movedItem] = 9999; // Mark newly disabled component
      }
    }

    // Update state with the new order and disabled components
    setOrder(newOrder);
    setDisabledComponents(newDisabledComponents);
    setComponentsListWithOrder(updatedOrder);
  };

  const resetOrder = () => {
    setOrder(
      Object.keys(defaultOrder).sort(
        (a, b) =>
          defaultOrder[a as keyof typeof defaultOrder] -
          defaultOrder[b as keyof typeof defaultOrder]
      )
    );
    setDisabledComponents([]);
    setComponentsListWithOrder(defaultOrder);
  };

  const activateDisabeled = () => {
    setIsDisabledActivated(!isDisabledActivated);
  };

  return (
    <>
      <div className="flex flex-row justify-between  px-2 py-2">
        {/* Make text in center */}
        <span className="text-center my-[auto]">{t("order.title")}</span>
        <Button variant={"outline"} size={"icon"} onClick={resetOrder}>
          <RefreshCcw />
        </Button>
        <Button variant={"outline"} size={"icon"} onClick={activateDisabeled}>
          {isDisabledActivated ? <EyeIcon /> : <EyeOff />}
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="components">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="mb-4"
            >
              {order.map((item, index) => (
                <Draggable
                  key={item}
                  draggableId={item}
                  index={index}
                  isDragDisabled={order.length === 1}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex justify-between items-center py-4 px-2 bg-[--tg-theme-secondary-background-color] shadow-lg transition-colors duration-300"
                    >
                      <span>{tOrder(item as keyof typeof tOrder)}</span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {isDisabledActivated && (
          <>
            <h3 className="p-2 pt-0">{t("order.disabled")}</h3>
            <Droppable droppableId="disabledComponents">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {/* Hide the disabled components list if there are no disabled components and no dragging */}
                  {noElements && (
                    <div className="text-center border-2 border-dashed dark:text-slate-600 text-slate-200  dark:border-slate-700/40 border-slate-200 rounded-lg p-4 m-4">
                      {t("order.disabledExtra")}
                    </div>
                  )}

                  {disabledComponents.map((item, index) => (
                    <Draggable key={item} draggableId={item} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`flex justify-between items-center py-4 px-2 bg-[--tg-theme-secondary-background-color] shadow-lg transition-colors duration-300`}
                        >
                          <span>{tOrder(item as keyof typeof tOrder)}</span>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </>
        )}
      </DragDropContext>
    </>
  );
}
