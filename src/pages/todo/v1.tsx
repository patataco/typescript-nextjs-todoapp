import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import Layout from '@/components/Layout';
import TodoListView from '@/components/TodoListView';
import { TaskProvider } from '@/context/TaskContext';
import { versionAtom } from '@/recoil/todo/atom';
import { Task } from '@/type/type';

export default function V1() {
  const [initialTasks, setInitialTasks] = useState<Task[] | null>(null);
  const setVersionType = useSetRecoilState(versionAtom);
  useEffect(() => {
    const tasksInStorage = localStorage.getItem('tasks');
    setVersionType('context');
    if (tasksInStorage) {
      const newTasks = JSON.parse(tasksInStorage);

      setInitialTasks(newTasks);
    } else {
      setInitialTasks([]);
    }
  }, []);

  if (!initialTasks) return;

  return (
    <div className="flex flex-col items-center gap-8 pt-12">
      <TaskProvider initialTask={initialTasks}>
        <h2>Context API 활용</h2>
        <TodoListView />
      </TaskProvider>
    </div>
  );
}

V1.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
