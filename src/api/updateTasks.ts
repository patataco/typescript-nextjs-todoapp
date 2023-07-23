import { Task } from '@/type/type';
import { apiClient } from '@/utils/axios';

export const updateTasks = async ({ id, ...rest }: Task) => {
  return await apiClient.patch(`/v1/todos_2?id=eq.${id}`, rest);
};
