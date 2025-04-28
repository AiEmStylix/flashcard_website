import { jwtDecode } from "jwt-decode";
import { defineStore } from "pinia";

interface TokenPayload {
  email: string,
  exp: number
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: '' as string,
  }),
  actions: {
    setAccessToken(token: string) {
      this.accessToken = token;
      localStorage.setItem('accessToken', token);
    },
    clearAccessToken() {
      this.accessToken = '';
      localStorage.removeItem('accessToken');
    },
    loadAccessToken() {
      const token = localStorage.getItem('accessToken');
      if (token) {
        this.accessToken = token;
      }
    }
  },
  getters: {
    userInfo(state): TokenPayload | null {
      if (!state.accessToken) return null;
      try {
        return jwtDecode<TokenPayload>(state.accessToken);
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  }
})