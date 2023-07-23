import { useRecoilValue } from 'recoil';

import { useTasksContext } from '@/context/TaskContext';
import { versionAtom } from '@/recoil/todo/atom';
import { useTasksItems } from '@/recoil/todo/useTaskItems';
import { useTasksServer } from '@/recoil/todo/useTasksServer';

export const useTasksManager = () => {
  const versionType = useRecoilValue(versionAtom);
  const contextTasks = useTasksContext();
  const recoilTasks = useTasksItems();
  const serverTasks = useTasksServer();

  switch (versionType) {
    case 'server':
      return serverTasks;
    case 'recoil':
      return recoilTasks;
    case 'context':
    default:
      return contextTasks;
  }
};
