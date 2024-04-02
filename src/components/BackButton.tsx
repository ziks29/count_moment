"use client";
import { useBackButton } from "@tma.js/sdk-react";
import { useRouter } from "next/navigation";

export function BackButton({ current }: { current: string }) {
  const backButton = useBackButton();
  const router = useRouter();
  backButton.show();
  backButton.on("click", () => {
    if (current === "settings") {
      router.push("/");
    } else {
      router.back();
    }
  });

  return null;
}
