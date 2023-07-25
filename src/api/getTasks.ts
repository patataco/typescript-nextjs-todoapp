import { Task } from '@/type/type';
import { apiClient } from '@/utils/axios';

export const getTasks = () => {
  return apiClient.get<Task[]>('/v1/todos_2');
};
