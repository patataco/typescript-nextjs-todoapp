import { useQuery } from '@tanstack/react-query';

import { getTasks } from '@/api/getTasks';
import { Task } from '@/type/type';

export const QUERY_KEY_TASKS = 'QUERY_KEY_TASKS';
export const useTasks = () => {
  return useQuery<Task[]>([QUERY_KEY_TASKS], getTasks);
};
