import { useQuery } from '@tanstack/react-query';

import { getTasks } from '@/api/getTasks';
import { Task } from '@/type/type';

export const QUERY_KEY_TASKS = 'QUERY_KEY_TASKS';

const fetchTasks = async () => {
  try {
    const response = await getTasks();
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useTasks = () => {
  return useQuery<Task[]>([QUERY_KEY_TASKS], fetchTasks);
};
