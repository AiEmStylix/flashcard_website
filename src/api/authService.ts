import axios from "axios";
import api from "./api";

export async function login(email: string, password: string) {
  try {
    const response = await api.post('/v1/auth/login', {
      email,
      password
    });
    const accessToken = response.data.accessToken;
    localStorage.setItem('accessToken', accessToken);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Login failed:', error.response?.data || error.message);
    } else {
      console.error('Unknown error:', error);
    }
    throw error;
  }
}

export async function register(username: string, email: string, password: string, fullName: string) {
  try {
    const response = await api.post('/v1/auth/register', {
      username,
      email,
      password,
      fullName,
    });
    const accessToken = response.data.accessorToken;
    localStorage.setItem('accessToken', accessToken);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Register failed:', error.response?.data || error.message);
    } else {
      console.error('Unknown error:', error);
    }
    throw error;
  }
}
