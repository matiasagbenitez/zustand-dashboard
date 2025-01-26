import { create, StateCreator } from "zustand";
import type { AuthStatus, User } from "../../interfaces";
import { AuthService } from "../../services/auth.service";
import { devtools, persist } from "zustand/middleware";

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User

    login: (email: string, password: string) => Promise<void>;
    checkAuthStatus: () => void;
    logout: () => void;
}

const storeApi: StateCreator<AuthState> = (set) => ({
    status: 'authenticating',
    token: undefined,
    user: undefined,

    login: async (email, password) => {
        try {
            const { token, ...user } = await AuthService.login(email, password);
            set({ status: 'authenticated', token, user });
        } catch (error) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            throw 'Unable to login';
        }
    },

    checkAuthStatus: async () => {
        try {
            const { token, ...user } = await AuthService.checkAuthStatus();
            set({ status: 'authenticated', token, user });
        } catch (error) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
        }
    },

    logout: () => {
        set({ status: 'unauthenticated', token: undefined, user: undefined });
    }
});

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(storeApi, { name: 'auth-storage' })
    )
);