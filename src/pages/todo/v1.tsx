import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';

import TodoListView from '@/components/TodoListView';
import { TaskProvider } from '@/context/TaskContext';
import { Task } from '@/type/type';

export default function V1() {
  const [initialTasks, setInitialTasks] = useState<Task[] | null>(null);
  useEffect(() => {
    const tasksInStorage = localStorage.getItem('tasks');

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
      <RecoilRoot>
        <TaskProvider initialTask={initialTasks}>
          <TodoListView />
        </TaskProvider>
      </RecoilRoot>
    </>
  );
}
