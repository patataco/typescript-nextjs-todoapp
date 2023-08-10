import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import Layout from '@/components/Layout';
import TodoListView from '@/components/TodoListView';
import { TaskProvider } from '@/context/TaskContext';
import { versionAtom } from '@/recoil/todo/atom';
import { Task } from '@/type/type';

export default function V4() {
  const setVersionType = useSetRecoilState(versionAtom);
  const [initialTasks] = useState<Task[] | null>([]);

  useEffect(() => {
    setVersionType('query');
  }, [setVersionType]);

  if (!initialTasks) return;

  return (
    <>
      <TaskProvider initialTask={initialTasks}>
        <h1>React Query Optimistic Updates</h1>
        <TodoListView />
      </TaskProvider>
    </>
  );
}

V4.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
