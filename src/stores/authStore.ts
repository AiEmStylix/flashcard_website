import { jwtDecode } from 'jwt-decode';
import { defineStore } from 'pinia';

interface TokenPayload {
  email: string;
  exp: number;
}

interface UserInfo {
  id?: number;
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatarUrl?: string;
  // Add other properties as needed
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: '' as string,
    userInfo: null as UserInfo | null,
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
    },
    setUserInfo(info: UserInfo) {
      this.userInfo = info;
      // Optionally, you can also store this in localStorage if you want it to persist
      localStorage.setItem('userInfo', JSON.stringify(info));
    },
    loadUserInfo() {
      const userInfoString = localStorage.getItem('userInfo');
      if (userInfoString) {
        try {
          this.userInfo = JSON.parse(userInfoString);
        } catch (error) {
          console.error('Error parsing userInfo from localStorage:', error);
        }
      }
    },
    clearUserInfo() {
      this.userInfo = null;
      localStorage.removeItem('userInfo');
    },
    logout() {
      this.clearAccessToken();
      this.clearUserInfo();
    },
  },
  getters: {
    tokenPayload(state): TokenPayload | null {
      if (!state.accessToken) return null;
      try {
        return jwtDecode<TokenPayload>(state.accessToken);
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  },
});
