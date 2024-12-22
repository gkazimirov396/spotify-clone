import { AxiosError } from 'axios';
import { create } from 'zustand';

import axios from '@/lib/axios';

interface AuthStore {
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;

  checkAdminStatus: () => Promise<void>;
  reset: () => void;
}
// TODO: add custom hooks with react query
export const useAuthStore = create<AuthStore>(set => ({
  isAdmin: false,
  isLoading: false,
  error: null,

  checkAdminStatus: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get<{ admin: boolean }>('/admin/check');

      set({ isAdmin: response.data.admin });
    } catch (error) {
      if (error instanceof AxiosError) {
        set({ isAdmin: false, error: error?.response?.data.message });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => set({ isAdmin: false, isLoading: false, error: null }),
}));
