"use client";

import { useEffect } from "react";
import {
  useMiniApp,
  useViewport,
  useThemeParams,
  usePopup,
  useMainButton,
  useSettingsButton,
  useClosingBehavior,
  useInitData,
} from "@tma.js/sdk-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter, usePathname } from "next/navigation";
import { useStore } from "@/store/storage";

export function MiniApp() {
  const miniApp = useMiniApp();
  // const { loadFromCloud } = useStore();
  const viewport = useViewport();
  const initData = useInitData();
  const { storedInitData, setStoredInitData } = useStore();
  const themeParams = useThemeParams();
  const popup = usePopup();
  const mainButton = useMainButton();
  const settingsButton = useSettingsButton();
  const closingBehavior = useClosingBehavior();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    // closingBehavior.enableConfirmation();
    setStoredInitData(initData);
    viewport.expand();
    settingsButton.show();
    settingsButton.on("click", () => {
      console.log("Go to settings");
      router.push("/settings");
    });

    mainButton.setText("Main button");
    mainButton.enable();
    //mainButton.show();
    mainButton.on("click", () => {
      console.log("Main button clicked");
      popup.open({
        title: "Hello!",
        message: "Here is a test message.",
        buttons: [{ id: "my-id", type: "default", text: "Default text" }],
      });
    });

    miniApp.ready();

    if (themeParams.isDark) {
      //Change data theme of tailwind to dark mode
      console.log("Dark mode");
      document.documentElement.classList.add("dark");
    } else {
      console.log("Light mode");
      document.documentElement.classList.remove("dark");
    }
  }, [
    miniApp,
    viewport,
    themeParams,
    settingsButton,
    mainButton,
    router,
    initData?.user?.id,
    popup,
    setStoredInitData,
    initData,
  ]);

  return (
    <div className="px-2">
      <Accordion type="single" collapsible>
        <AccordionItem value="1">
          <AccordionTrigger className="text-xs">Mini App</AccordionTrigger>
          <AccordionContent>
            <div className="text-wrap text-xs">
              <p>Mini App is ready</p>
              <p>Viewport expanded</p>
              <div className="flex flex-col break-all ">
                <h1>Init Data: </h1>
                <p>{JSON.stringify(storedInitData, null, 2)}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
