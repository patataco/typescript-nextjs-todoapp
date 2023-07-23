import { apiClient } from '@/utils/axios';

export const getTasks = async () => {
  const { data } = await apiClient.get('/v1/todos_2');
  return data;
};
