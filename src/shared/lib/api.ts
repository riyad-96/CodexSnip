import { auth } from '@/features/auth/lib/firebase.config';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_server_api,
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
