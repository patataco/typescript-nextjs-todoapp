import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import TodoListView from '@/components/TodoListView';
import { TaskProvider } from '@/context/TaskContext';
import { versionAtom } from '@/recoil/todo/atom';
import { Task } from '@/type/type';

export default function V2() {
  const [initialTasks, setInitialTasks] = useState<Task[] | null>(null);
  const setVersionType = useSetRecoilState(versionAtom);
  useEffect(() => {
    const tasksInStorage = localStorage.getItem('tasks');
    setVersionType('recoil');
    if (tasksInStorage) {
      const newTasks = JSON.parse(tasksInStorage);
      setInitialTasks(newTasks);
    } else {
      setInitialTasks([]);
    }
  }, []);

  if (!initialTasks) return;

  return (
    <>
      <TaskProvider initialTask={initialTasks}>
        <TodoListView />
      </TaskProvider>
    </>
  );
}
