import { MoodType } from "@prisma/client";
import { create } from "zustand";

interface MoodState {
  moods: {
    mood: MoodType;
    createdAt: Date;
  }[];
  latestMood: MoodType | null;
  addMood: (mood: MoodType) => void;
  loadMoods: (moods: { mood: MoodType; createdAt: Date }[]) => void;
}

export const useMoodStore = create<MoodState>()((set) => ({
  moods: [],
  latestMood: null,
  addMood: (mood: MoodType) =>
    set((state) => ({
      moods: [
        ...state.moods,
        {
          mood,
          createdAt: new Date(),
        },
      ],
      latestMood: mood,
    })),
  loadMoods: (moods) =>
    set(() => ({
      moods,
    })),
}));
