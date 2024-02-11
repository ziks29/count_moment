import { create } from "zustand";
import { CloudStorage, postEvent } from "@tma.js/sdk";

const cloudStorage = new CloudStorage(
  "6.10",
  () => Math.random().toString(),
  postEvent
);

type Mood =
  | "Happy"
  | "Sad"
  | "Excited"
  | "Tired"
  | "Angry"
  | "Anxious"
  | "Relaxed"
  | "Motivated"
  | "Stressed"
  | "Hopeful"
  | "Bored"
  | "Grateful";

interface MoodState {
  mood: Mood | "";
  moodCounter: number;
  setMood: (mood: Mood) => void;
  setMoodOnInit: (mood: Mood) => void;
  tasks: string[];
  addTask: (task: string) => void;
  syncWithCloud: (title: string, content: string) => Promise<void>;
  loadFromCloud: () => Promise<void>;
  // Order of components in main page. Key is the name of the component and value is the order
  componentsListWithOrder: { [key: string]: number };
  lastComponentOrder: number;
  // setComponentsListWithOrder: (order: { [key: string]: number }) => void;
  addToComponentsListWithOrder: (component: string, order: number) => void;
  adjustComponentOrder: (component: string, order: number) => void;
  storedInitData: any;
  setStoredInitData: (data: any) => void;
}

export const useStore = create<MoodState>()((set) => ({
  mood: "" as Mood,
  moodCounter: 0,
  setMood: (mood: Mood) =>
    set((state) => {
      const updatedMood = { mood, moodCounter: state.moodCounter + 1 };
      syncWithCloud("mood", updatedMood.mood);
      syncWithCloud("moodCounter", updatedMood.moodCounter);
      return updatedMood;
    }),
  setMoodOnInit: (mood: Mood) =>
    set((state) => {
      const updatedMood = { mood, moodCounter: state.moodCounter };
      syncWithCloud("mood", updatedMood.mood);
      syncWithCloud("moodCounter", updatedMood.moodCounter);
      return updatedMood;
    }),
  tasks: [],
  addTask: (task: string) =>
    set((state) => ({ tasks: [...state.tasks, task] })),

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
      const data = await Promise.all(
        keys.map(async (key) => {
          const content = await cloudStorage.get(key);
          syncWithLocal(key, content);
        })
      );
      //Set with the data from the cloud
      console.log("Data loaded from cloud", data);
    } catch (error) {
      console.error("Error loading from cloud", error);
    }
  },
  //Settings component
  componentsListWithOrder: {},
  // setComponentsListWithOrder: (order: { [key: string]: number }) =>
  //   set((state) => ({ componentsListWithOrder: order })),
  addToComponentsListWithOrder: (component: string, order: number) =>
    set((state) => ({
      componentsListWithOrder: {
        ...state.componentsListWithOrder,
        [component]: order,
      },
      lastComponentOrder: order,
    })),
  adjustComponentOrder: (component: string, orderChange: number) => {
    set((state) => {
      let componentsListWithOrder = { ...state.componentsListWithOrder };
      const currentOrder = componentsListWithOrder[component];
      const activeOrders = Object.values(componentsListWithOrder)
        .filter((order) => order !== 9999)
        .sort((a, b) => a - b);
      const highestActiveOrder =
        activeOrders.length > 0 ? activeOrders[activeOrders.length - 1] : 0;

      if (orderChange === 9999) {
        // Toggle the component's state between active and disabled
        if (currentOrder === 9999) {
          // Re-enable the component by assigning it the next highest active order
          componentsListWithOrder[component] = highestActiveOrder + 1;
        } else {
          // Disable the component
          componentsListWithOrder[component] = 9999;
        }
      } else {
        // Adjust order within enabled components, ignoring disabled ones
        let sortedComponents = Object.entries(componentsListWithOrder)
          .filter(([_, order]) => order !== 9999)
          .sort(([, a], [, b]) => a - b);

        const currentIndex = sortedComponents.findIndex(
          ([key, _]) => key === component
        );
        let newIndex = currentIndex + orderChange;

        // Ensure newIndex is within bounds
        newIndex = Math.max(0, Math.min(sortedComponents.length - 1, newIndex));

        if (newIndex !== currentIndex) {
          // Reassign orders to maintain sequence without gaps, excluding disabled components
          sortedComponents.splice(currentIndex, 1); // Remove current item
          sortedComponents.splice(newIndex, 0, [component, currentOrder]); // Insert at new position

          // Reassign orders starting from 1
          sortedComponents.forEach(([key], index) => {
            componentsListWithOrder[key] = index + 1;
          });
        }
      }

      // After adjusting, ensure disabled components stay at the end with order 9999
      const disabledComponents = Object.keys(componentsListWithOrder).filter(
        (key) => componentsListWithOrder[key] === 9999
      );
      disabledComponents.forEach((key) => {
        componentsListWithOrder[key] = 9999;
      });

      const lastComponentOrder = Math.max(
        ...Object.values(componentsListWithOrder).filter(
          (order) => order !== 9999
        )
      );

      syncWithCloud(
        "componentsListWithOrder",
        JSON.stringify(componentsListWithOrder)
      );
      return { componentsListWithOrder, lastComponentOrder };
    });
  },
  lastComponentOrder: 0,
  storedInitData: {},
  setStoredInitData: (data: any) => set((state) => ({ storedInitData: data })),
}));

function syncWithCloud(title: string, content: any) {
  console.log("Syncing with cloud", title, content);
  useStore.getState().syncWithCloud(title, content);
}

function syncWithLocal(title: string, content: string) {
  console.log("Syncing with local", title, content);
  switch (title) {
    case "mood":
      const string = content.replace(/"/g, "") as Mood;
      useStore.getState().mood = string;
      break;
    case "moodCounter":
      useStore.getState().moodCounter = parseInt(content);
      break;
    case "componentsListWithOrder":
      useStore.getState().componentsListWithOrder = JSON.parse(content);
      break;
    default:
      console.error("Unknown title", title);
  }
}
