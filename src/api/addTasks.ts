import { apiClient } from '@/utils/axios';

export interface NewTask {
  title: string;
  content: string;
}
export const addTasks = async (options: NewTask) => {
  return await apiClient.post('/v1/todos_2', options);
};
