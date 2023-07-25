import { Task } from '@/type/type';
import { apiClient } from '@/utils/axios';

export type NewTask = Pick<Task, 'title' | 'content'>;

export const addTasks = async (options: NewTask) => {
  return await apiClient.post('/v1/todos_2', options);
};
