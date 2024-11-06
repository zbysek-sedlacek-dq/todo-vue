import axios, { type AxiosResponse } from 'axios'
import { ref } from "vue";

export interface TodoItem {
  id: number;
  title: string;
  done: boolean;
  createdAt: Date;
}

const API_URL = 'http://localhost:5076'; // Example API endpoint

export let authorizationStatus = {
  loggedIn: ref(false),
  username: ref<string>(null)
}

let token = localStorage.getItem("token");
if (token) {
  authorizationStatus.loggedIn.value = true;
  authorizationStatus.username.value = localStorage.getItem("name")
}

// Create an Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set up an interceptor to add the auth token to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${ token }`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const getTodos = async (): Promise<TodoItem[]> => {
  const response: AxiosResponse<TodoItem[]> = await apiClient.get(API_URL + "/todos");
  return response.data;
};

export const createTodo = async (title: string): Promise<TodoItem> => {
  const response: AxiosResponse<TodoItem> = await apiClient.post(API_URL + "/todos", {
    title,
    completed: false,
  });
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await apiClient.delete(`${ API_URL }/todos/${ id }`);
};

export const toggleTodo = async (todoId: number): Promise<TodoItem> => {
  const response: AxiosResponse<TodoItem> = await apiClient.put(`${ API_URL }/todos/${ todoId }/toggle`);
  return response.data;
};

export const login = async (name: string): Promise<{ token, name }> => {
  const response: AxiosResponse<TodoItem> = await apiClient.post(`${ API_URL }/login`, {username: name});
  localStorage.setItem("name", name)
  localStorage.setItem("token", response.data.token)
  authorizationStatus.loggedIn.value = true
  authorizationStatus.username.value = name
  return {name};
}

export const logout = () => {
  localStorage.removeItem("name")
  localStorage.removeItem("token")
  authorizationStatus.loggedIn.value = false
  authorizationStatus.username.value = null
}
