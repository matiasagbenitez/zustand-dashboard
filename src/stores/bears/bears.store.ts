import { create } from 'zustand';

interface Bear {
    id: number;
    name: string;
}

interface BearState {
    blackBears: number;
    polarBears: number;
    pandaBears: number;

    bears: Bear[];

    // Tip
    computed: {
        totalBears: number;
    };

    increaseBlackBears: (by: number) => void;
    increasePolarBears: (by: number) => void;
    increasePandaBears: (by: number) => void;

    doNothing: () => void;
    addBear: () => void;
    clearBears: () => void;
}

export const useBearStore = create<BearState>()((set, get) => ({
    blackBears: 10,
    polarBears: 5,
    pandaBears: 1,

    bears: [
        { id: 1, name: 'Oso #1' },
        { id: 2, name: 'Oso #2' },
        { id: 3, name: 'Oso #3' },
    ],

    // Tip
    computed: {
        get totalBears() {
            return get().blackBears + get().polarBears + get().pandaBears + get().bears.length;
        },
    },

    increaseBlackBears: (by) => set((state) => ({ blackBears: state.blackBears + by })),
    increasePolarBears: (by) => set((state) => ({ polarBears: state.polarBears + by })),
    increasePandaBears: (by) => set((state) => ({ pandaBears: state.pandaBears + by })),

    doNothing: () => set((state) => ({ bears: [...state.bears] })),
    addBear: () => set((state) => ({
        bears: [...state.bears, { id: state.bears.length + 1, name: `Oso #${state.bears.length + 1}` }]
    })),
    clearBears: () => set({ bears: [] }),
}));
