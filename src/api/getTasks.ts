import { Task } from '@/type/type';
import { apiClient } from '@/utils/axios';

const KEY_CHANGE_GET: Record<string, string> = {
  id: 'id',
  title: 'title',
  content: 'content',
  start_date_time: 'startDateTime',
  due_date_time: 'dueDateTime',
  created_at: 'createdDateTime',
  updated_at: 'lastModifiedDateTime',
  status: 'status',
  categories: 'categories',
};

const convertKey = (tasks: Task[]) => {
  return tasks.map((task) => {
    return Object.keys(task).reduce((newTask: any, key: string) => {
      const newKey = KEY_CHANGE_GET[key];
      newTask[newKey] = task[key as keyof Task];
      return newTask;
    }, {});
  });
};
export const getTasks = async () => {
  const response = await apiClient.get<Task[]>('/v1/todos_2');

  const data = convertKey(response.data);
  return data;
};
