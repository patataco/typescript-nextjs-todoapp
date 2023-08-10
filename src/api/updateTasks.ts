import { Task } from '@/type/type';
import { apiClient } from '@/utils/axios';

export const KEY_CHANGE_SEND: Record<string, string> = {
  id: 'id',
  title: 'title',
  content: 'content',
  startDateTime: 'start_date_time',
  dueDateTime: 'due_date_time',
  createdDateTime: 'created_at',
  lastModifiedDateTime: 'updated_at',
  status: 'status',
  categories: 'categories',
  clientId: 'client_id',
};

export type UpdateTask = Partial<Task>;
export const updateTasks = async (task: UpdateTask) => {
  const { id, ...rest } = task;
  return await apiClient.patch(`/v1/todos_2?id=eq.${id}`, [rest]);
};
