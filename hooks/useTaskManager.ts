import { useRouter } from 'next/router';

import { useTasksContext } from '@/context/TaskContext';
import { useTasksItems } from '@/recoil/todo/useTaskItems';
import { useTasksServer } from '@/recoil/todo/useTasksServer';

export const useTasksManager = () => {
  const router = useRouter();
  const contextTasks = useTasksContext();
  const recoilTasks = useTasksItems();
  const serverTasks = useTasksServer();

  if (router.pathname.includes('/v1')) {
    return contextTasks;
  } else if (router.pathname.includes('/v2')) {
    return recoilTasks;
  } else return serverTasks;
};
