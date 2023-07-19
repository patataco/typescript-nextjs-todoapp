import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';

import TodoListView from '@/components/TodoListView';
import { TaskProvider } from '@/context/TaskContext';
import { Task } from '@/type/type';

import { getTasks } from '../api/getTasks';

export default function V3() {
  const [initialTasks, setInitialTasks] = useState<Task[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getTasks();
      setInitialTasks(data);
    };

    fetchData();
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
