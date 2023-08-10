import { AxiosPromise } from 'axios';

import { Task } from '@/type/type';
import { apiClient } from '@/utils/axios';

export const KEY_CHANGE_GET: Record<string, string> = {
  id: 'id',
  title: 'title',
  content: 'content',
  start_date_time: 'startDateTime',
  due_date_time: 'dueDateTime',
  created_at: 'createdDateTime',
  updated_at: 'lastModifiedDateTime',
  status: 'status',
  categories: 'categories',
  client_id: 'clientId',
};

export const getTasks: () => AxiosPromise<Task[]> = async () => {
  return await apiClient.get<Task[]>('/v1/todos_2');
};
