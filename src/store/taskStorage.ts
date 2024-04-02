import { create } from "zustand";

interface TaskState {
  tasks: {
    content: string;
    completed: boolean;
    createdAt: Date;
    editedAt: Date;
  }[];
  addTask: (
    task: string,
    completed: boolean,
    createdAt: Date,
    editedAt: Date
  ) => void;
  loadTasks: (
    tasks: {
      content: string;
      completed: boolean;
      createdAt: Date;
      editedAt: Date;
    }[]
  ) => void;
}

export const useTaskStore = create<TaskState>()((set) => ({
  tasks: [],
  loadTasks: (tasks) => set({ tasks }),
  addTask: (task, completed, createdAt, editedAt) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { content: task, completed, createdAt, editedAt },
      ],
    })),
}));
