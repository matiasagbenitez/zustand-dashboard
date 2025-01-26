import { create, StateCreator } from "zustand";
import type { Task, TaskStatus } from "../../interfaces";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";
import { immer } from "zustand/middleware/immer";

export interface TaskState {
    tasks: Record<string, Task>;        // { [id: string]: Task }
    getTasksByStatus: (status: TaskStatus) => Task[];
    addTask: (title: string, status: TaskStatus) => void;

    draggingTaskId?: string;
    setDraggingTaskId: (taskId: string) => void;
    removeDraggingTaskId: () => void;
    changeTaskStatus: (taskId: string, status: TaskStatus) => void;

    onTaskDrop: (status: TaskStatus) => void;
}

// const storeApi: StateCreator<TaskState> = (set, get) => ({
const storeApi: StateCreator<TaskState, [["zustand/immer", never]]> = (set, get) => ({
    tasks: {
        'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'open' },
        'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'in-progress' },
        'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'open' },
        'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'open' },
    },

    getTasksByStatus: (status: TaskStatus) => {
        return Object.values(get().tasks).filter(task => task.status === status);
    },

    addTask: (title: string, status: TaskStatus) => {
        const id = `ABC-${Object.keys(get().tasks).length + 1}`;

        // * Spread operator
        // set(state => ({
        //     tasks: {
        //         ...state.tasks,
        //         [id]: {
        //             id,
        //             title,
        //             status,
        //         }
        //     }
        // }));

        // * Immer (npm package)
        // set(produce((state) => {
        //     state.tasks[id] = {
        //         id,
        //         title,
        //         status,
        //     };
        // }));

        // * Immer (Zustand middleware)
        set((state) => {
            state.tasks[id] = {
                id,
                title,
                status,
            };
        });
    },

    draggingTaskId: undefined,
    setDraggingTaskId: (taskId: string) => set({ draggingTaskId: taskId }),
    removeDraggingTaskId: () => set({ draggingTaskId: undefined }),
    changeTaskStatus: (taskId: string, status: TaskStatus) => {

        // * Spread operator
        // set(state => ({
        //     tasks: {
        //         ...state.tasks,
        //         [taskId]: {
        //             ...state.tasks[taskId],
        //             status,
        //         }
        //     }
        // }));

        // * Immer (npm package)
        // set(produce((state) => {
        //     state.tasks[taskId].status = status;
        // }));

        // * Immer (Zustand middleware)
        set((state) => {
            state.tasks[taskId].status = status;
        });
    },



    onTaskDrop: (status: TaskStatus) => {
        const draggingTaskId = get().draggingTaskId;
        if (draggingTaskId) {
            get().changeTaskStatus(draggingTaskId, status);
            get().removeDraggingTaskId();
        }
    }

});

export const useTaskStore = create<TaskState>()(
    devtools(
        persist(
            // * Immer (Zustand middleware)
            immer(storeApi),
            { name: 'task-storage' }
        ),
    )
);