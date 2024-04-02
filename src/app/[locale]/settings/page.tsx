import { OrderSettings } from "./components/OrderSettings";
import { ChangeLanguage } from "./components/ChangeLanguage";
import { getScopedI18n } from "@/locales/server";
import { BackButton } from "@/components/BackButton";

export default async function Settings() {
  const t = await getScopedI18n("settings");

  return (
    <div className="text-[--tg-theme-text-color] flex flex-col h-max ">
      <h1 className="text-center py-2 text-xl">{t("title")}</h1>
      <ChangeLanguage />
      <OrderSettings />
      <BackButton current={"settings"} />
    </div>
  );
}
