import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { getTasks } from '@/api/getTasks';
import { Task } from '@/type/type';

export const QUERY_KEY_TASKS = 'QUERY_KEY_TASKS';

export const useTasks = () => {
  return useQuery<AxiosResponse<Task[]>, AxiosError, Task[]>(
    [QUERY_KEY_TASKS],
    getTasks,
    {
      select: (response) => response.data,
    }
  );
};
