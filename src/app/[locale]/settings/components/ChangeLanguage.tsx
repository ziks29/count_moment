"use client";
import {
  useChangeLocale,
  useCurrentLocale,
  useScopedI18n,
} from "@/locales/client";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStorage";

export function ChangeLanguage() {
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();
  const { setLocale } = useUserStore();
  const t = useScopedI18n("settings.changeLanguage");
  const tLanguage = useScopedI18n("settings.changeLanguage.language");

  const toggleLanguage = () => {
    if (currentLocale === "en") {
      changeLocale("ru");
      setLocale("ru");
    } else {
      changeLocale("en");
      setLocale("en");
    }
  };

  return (
    <div className="flex flex-row items-center justify-between w-full gap-2  dark:bg-slate-700/40 bg-slate-200 p-2 ">
      <h1 className="text-center py-2">{t("title")}</h1>
      <div className="flex gap-2">
        <Button onClick={toggleLanguage}>
          {tLanguage(currentLocale === "en" ? "ru" : "en")}
        </Button>
      </div>
    </div>
  );
}
