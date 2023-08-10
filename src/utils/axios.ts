import axios from 'axios';

import { KEY_CHANGE_GET } from '@/api/getTasks';
import { KEY_CHANGE_SEND } from '@/api/updateTasks';
import { Task } from '@/type/type';

export const apiClient = axios.create({
  baseURL: 'https://hjpuuwgcwywzcntprhad.supabase.co/rest',
});

apiClient.defaults.headers.common['apiKey'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqcHV1d2djd3l3emNudHByaGFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkzODczNTIsImV4cCI6MjAwNDk2MzM1Mn0.rXKGHwQAb1h5i0dVqDkr-HejejWsL5dntZgfapvUMmI';

apiClient.interceptors.request.use(
  function (config) {
    if (config.data) {
      const convertData = config.data.map((task: Partial<Task>) => {
        return Object.keys(task).reduce(
          (newTask: Record<string, unknown>, key: string) => {
            const newKey = KEY_CHANGE_SEND[key];
            newTask[newKey] = task[key as keyof Task];
            return newTask;
          },
          {}
        );
      });
      return { ...config, data: convertData };
    } else {
      return config;
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  function (response) {
    if (Array.isArray(response.data)) {
      const convertData = response.data.map((task: Task) => {
        return Object.keys(task).reduce(
          (newTask: Record<string, unknown>, key: string) => {
            const newKey = KEY_CHANGE_GET[key];
            newTask[newKey] = task[key as keyof Task];
            return newTask;
          },
          {}
        );
      });
      return { ...response, data: convertData };
    } else {
      return response;
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);
