"use client";
import { useEffect } from "react";
import {
  useMiniApp,
  useViewport,
  useThemeParams,
  usePopup,
  useMainButton,
  useSettingsButton,
  useInitData,
} from "@tma.js/sdk-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStorage";
import { getUserByTelegramId } from "@/lib/actions";
import { useMoodStore } from "@/store/moodStorage";
import { useTaskStore } from "@/store/taskStorage";
import { useChangeLocale } from "@/locales/client";

export function MiniApp() {
  const miniApp = useMiniApp();
  const viewport = useViewport();
  const initData = useInitData();
  const themeParams = useThemeParams();
  const popup = usePopup();
  const mainButton = useMainButton();
  const settingsButton = useSettingsButton();
  const router = useRouter();
  const { telegramId, setTelegramId, setUserId, locale } = useUserStore();
  const { loadMoods } = useMoodStore();
  const { loadTasks } = useTaskStore();

  const changeLocale = useChangeLocale();

  settingsButton.show();
  settingsButton.on("click", () => {
    console.log("Go to settings");
    router.push("/settings");
  });

  useEffect(() => {
    // console.log("Init data: ", initData);
    viewport.expand();
    setTelegramId(initData?.user?.id as number);
    async function loadUserData() {
      const userData = await getUserByTelegramId(telegramId);
      if (userData) {
        setUserId(userData.id);
        loadMoods(userData.moods);
        loadTasks(userData.tasks);
      }
    }
    loadUserData();

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
    popup,
    initData,
    setTelegramId,
    telegramId,
    setUserId,
    loadMoods,
    loadTasks,
  ]);

  useEffect(() => {
    const supportedLanguages = ["en", "ru"]; // Extend this array as you add support for more languages
    const defaultLocale = "en"; // Default to English
    const systemLocale = initData?.user?.languageCode;

    //Check firstly if locale is initialized, if yes than just proceed with it
    if (locale) {
      console.log("Locale is already set: ", locale);
      return;
    }
    //If not, check if system locale is supported
    if (systemLocale && supportedLanguages.includes(systemLocale)) {
      console.log("System locale is supported: ", systemLocale);
      changeLocale(systemLocale as "en" | "ru"); // Typescript type assertion
    } else {
      console.log(
        "System locale is not supported, defaulting to: ",
        defaultLocale
      );
      changeLocale(defaultLocale);
    }
  }, [initData, locale, changeLocale]);

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
                <p>{JSON.stringify(initData, null, 2)}</p>
                <h1>User Params: </h1>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
