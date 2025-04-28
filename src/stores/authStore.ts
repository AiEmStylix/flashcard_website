import { defineStore } from "pinia";

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
  }
})