import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createPersonSlice, PersonSlice } from "./person.slice";
import { createGuestsSlice, GuestsSlice } from "./guests.slice";
import { createDateSlice, DateSlice } from "./date.slice";
import { ConfirmationSlice, createConfirmationSlice } from "./confirmation.slice";

type SharedState = PersonSlice & GuestsSlice & DateSlice & ConfirmationSlice;

export const useWeddingBoundStore = create<SharedState>()(
    devtools(
        (...args) => ({
            ...createPersonSlice(...args),
            ...createGuestsSlice(...args),
            ...createDateSlice(...args),
            ...createConfirmationSlice(...args),
        }),
    )
);