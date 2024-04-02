"use client";
import {
  SDKProvider,
  DisplayGate,
  type SDKInitOptions,
} from "@tma.js/sdk-react";
import { useUserStore } from "@/store/userStorage";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SDKProviderErrorProps {
  error: unknown;
}

function SDKProviderError({ error }: Readonly<SDKProviderErrorProps>) {
  return (
    <div>
      Oops. Something went wrong.
      <blockquote>
        <code>
          {error instanceof Error ? error.message : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}

function SDKProviderLoading() {
  return <div>SDK is loading.</div>;
}

function SDKInitialState() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[--tg-theme-background-color">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-100"></div>
    </div>
  );
}

/**
 * Root component of the whole project.
 */
export function TMAProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const options: SDKInitOptions = {
    cssVars: true,
    acceptCustomStyles: true,
    async: true,
    complete: true,
  };
  // Combined loading state
  const [isLoading, setIsLoading] = useState(true);
  const { loadFromCloud, locale } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const initAsyncOperations = async () => {
      try {
        await loadFromCloud();
        // Add any additional asynchronous initialization logic here

        // Locale setting logic, only proceed if `locale` is not null and hasn't been set this session
        if (!sessionStorage.getItem("localeSet") && locale) {
          sessionStorage.setItem("localeSet", "true");
          await router.push(`/${locale}`);
        }
      } catch (error) {
        console.error("Initialization error:", error);
        // Handle initialization errors appropriately
      } finally {
        setIsLoading(false);
      }
    };

    initAsyncOperations();
  }, [loadFromCloud, locale, router]);

  if (isLoading) {
    return <SDKInitialState />;
  } else {
    return (
      <SDKProvider options={options}>
        <DisplayGate
          error={SDKProviderError}
          loading={SDKProviderLoading}
          initial={SDKInitialState}
        >
          {children}
        </DisplayGate>
      </SDKProvider>
    );
  }
}
