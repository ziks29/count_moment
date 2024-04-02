import { create } from "zustand";
import { CloudStorage, postEvent } from "@tma.js/sdk";

const cloudStorage = new CloudStorage(
  "6.10",
  () => Math.random().toString(),
  postEvent
);

/**
 * Represents the state of a user.
 */
interface UserState {
  userId: string;
  telegramId: number;
  setUserId: (userId: string) => void;
  setTelegramId: (telegramId: number) => void;
  componentsListWithOrder: { [key: string]: number };
  lastComponentOrder: number;
  addToComponentsListWithOrder: (component: string, order: number) => void;
  setComponentsListWithOrder: (componentsListWithOrder: {
    [key: string]: number;
  }) => void;
  loadComponentsOrder: (componentsOrder: { [key: string]: number }) => void;
  syncWithCloud: (title: string, content: string) => Promise<void>;
  loadFromCloud: () => Promise<void>;
  cleanCloud: () => Promise<void>;
  //Locale state
  locale: string | null;
  setLocale: (locale: string) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  userId: "",
  telegramId: 0,
  setUserId: (userId: string) => set({ userId }),
  setTelegramId: (telegramId: number) => set({ telegramId }),
  componentsListWithOrder: {},
  cleanCloud: async () => {
    //Get all the keys from the cloud
    const keys = await cloudStorage.getKeys();
    //Delete all the keys from the cloud
    await Promise.all(keys.map((key) => cloudStorage.delete(key)));
  },
  addToComponentsListWithOrder: (component: string, order: number) =>
    set((state) => ({
      componentsListWithOrder: {
        ...state.componentsListWithOrder,
        [component]: order,
      },
      lastComponentOrder: order,
    })),
  // Set the components list with order and sync with cloud
  setComponentsListWithOrder: (componentsListWithOrder) => {
    set(() => ({
      componentsListWithOrder,
    }));
    syncWithCloud(
      "componentsListWithOrder",
      JSON.stringify(componentsListWithOrder)
    );
  },
  lastComponentOrder: 0,
  loadComponentsOrder: (componentsOrder) =>
    set(() => ({
      componentsListWithOrder: componentsOrder,
      lastComponentOrder: Math.max(
        ...Object.values(componentsOrder).filter((order) => order !== 9999)
      ),
    })),
  syncWithCloud: async (title: string, content: string) => {
    try {
      await cloudStorage.set(title, content);
    } catch (error) {
      console.error("Error syncing with cloud", error);
    }
  },
  //Load all the data from the cloud on app start
  loadFromCloud: async () => {
    try {
      const keys = await cloudStorage.getKeys();
      console.log("Keys loaded from cloud", keys);
      await Promise.all(
        keys.map(async (key) => {
          const content = await cloudStorage.get(key);
          syncWithLocal(key, content);
        })
      );
    } catch (error) {
      console.error("Error loading from cloud", error);
    }
  },
  //Locale state
  locale: null,
  setLocale: (locale: string) => {
    set(() => ({ locale }));
    syncWithCloud("locale", locale);
  },
}));

function syncWithCloud(title: string, content: any) {
  console.log("Syncing with cloud", title, content);
  useUserStore.getState().syncWithCloud(title, content);
}

function syncWithLocal(key: string, content: string) {
  if (key === "componentsListWithOrder") {
    useUserStore.getState().loadComponentsOrder(JSON.parse(content));
  }
  if (key === "locale") {
    useUserStore.getState().setLocale(content);
  }
}
