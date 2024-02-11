"use client";
import {
  SDKProvider,
  DisplayGate,
  type SDKInitOptions,
} from "@tma.js/sdk-react";
import { useStore } from "@/store/storage";
import { useEffect, useState } from "react";

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
  return <div>SDK is initializing.</div>;
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
  const [loading, setLoading] = useState(true);
  const { loadFromCloud } = useStore();

  useEffect(() => {
    const initAsyncOperations = async () => {
      try {
        await loadFromCloud();
        // Additional initialization logic can go here
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setLoading(false); // Ensure loading is false after operations complete
      }
    };

    initAsyncOperations();
  }, [loadFromCloud]);

  if (loading) {
    // Show loading UI
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-[--tg-theme-background-color">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-100"></div>
      </div>
    );
  }

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
