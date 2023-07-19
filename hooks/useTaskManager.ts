import { useRouter } from 'next/router';

import { useTasksContext } from '@/context/TaskContext';
import { useTasksItems } from '@/recoil/todo/useTaskItems';

export const useTasksManager = () => {
  const router = useRouter();
  const contextTasks = useTasksContext();
  const recoilTasks = useTasksItems();

  if (router.pathname.includes('/v1')) {
    return contextTasks;
  }
  return recoilTasks;
};
