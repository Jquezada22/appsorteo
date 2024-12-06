import { create } from 'zustand';

interface StoreState {
    participants: string[];
    addParticipants: (names: string[]) => void;
}

const useStore = create<StoreState>((set) => ({
    participants: [],
    addParticipants: (names) => set({ participants: names }),
}));

export default useStore;
