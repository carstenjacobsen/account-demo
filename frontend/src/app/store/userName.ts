import { create } from 'zustand';

interface State {
    userName: string;
}

interface Actions {
    setUserName: (userName: State['userName']) => void;
}

export const useUserNameStore = create<State & Actions>((set) => ({
    userName: '',
    setUserName: (userName) => set(() => ({ userName: userName })),
}));
