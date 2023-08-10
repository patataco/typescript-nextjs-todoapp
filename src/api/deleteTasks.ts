import { Task } from '@/type/type';
import { apiClient } from '@/utils/axios';

export const deleteTasks = async (task: Task) => {
  const { id } = task;
  return await apiClient.delete(`/v1/todos_2?id=eq.${id}`);
};
