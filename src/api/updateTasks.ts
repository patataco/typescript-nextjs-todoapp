import { Task } from '@/type/type';
import { apiClient } from '@/utils/axios';

const KEY_CHANGE_SEND: Record<string, string> = {
  id: 'id',
  title: 'title',
  content: 'content',
  startDateTime: 'start_date_time',
  dueDateTime: 'due_date_time',
  createdDateTime: 'created_at',
  lastModifiedDateTime: 'updated_at',
  status: 'status',
  categories: 'categories',
};

const convertKey = (task: Task) => {
  Object.keys(task).reduce((newTask: any, key: string) => {
    const newKey = KEY_CHANGE_SEND[key];
    newTask[newKey] = task[key as keyof Task];
    return newTask;
  }, {});
};

export const updateTasks = async (task: Task) => {
  const data = convertKey(task);
  console.log(data);
  return await apiClient.patch(`/v1/todos_2?id=eq.${data.id}`, rest);
};
