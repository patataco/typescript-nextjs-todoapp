import { Task } from '@/type/type';
import { apiClient } from '@/utils/axios';

export type NewTask = Omit<Task, 'id'>;

export type CreateTaskPayload = Pick<Task, 'title' | 'clientId'>;

export const addTasks = async (options: Task) => {
  const { clientId, title, ...rest } = options;
  const createTaskPayload: CreateTaskPayload = { clientId, title };
  console.log(createTaskPayload);
  return await apiClient.post('/v1/todos_2', [createTaskPayload]);
};
