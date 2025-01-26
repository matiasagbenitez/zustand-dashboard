import { StateCreator } from "zustand";

export interface DateSlice {
    eventDate: Date;

    eventYYYYMMDD: () => string;
    eventHHMM: () => string;

    setEventDate: (date: string) => void;
    setEventTime: (time: string) => void;
}

export const createDateSlice: StateCreator<DateSlice> = (set, get) => ({
    eventDate: new Date(),

    eventYYYYMMDD: () => {
        return get().eventDate.toISOString().split("T")[0];
    },

    eventHHMM: () => {
        const hours = get().eventDate.getHours().toString().padStart(2, "0");
        const minutes = get().eventDate.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    },

    setEventDate: (receivedDate: string) => set((state) => {
        const partialDateObj = new Date(receivedDate);
        const updatedDate = new Date(state.eventDate);

        updatedDate.setFullYear(
            partialDateObj.getFullYear(),
            partialDateObj.getMonth(),
            partialDateObj.getDate() + 1
        );

        return { eventDate: updatedDate };
    }),


    setEventTime: (receivedTime: string) => set((state) => {
        const hours = parseInt(receivedTime.split(":")[0], 10);
        const minutes = parseInt(receivedTime.split(":")[1], 10);
        const updatedDate = new Date(state.eventDate);

        updatedDate.setHours(hours, minutes);
        return { eventDate: updatedDate };
    }),
});