import { apiClient } from '@/utils/axios';

export const deleteTasks = async (id: string) => {
  return await apiClient.delete(`/v1/todos_2?id=eq.${id}`);
};
