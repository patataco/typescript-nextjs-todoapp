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
    <div className="flex flex-col items-center gap-8 pt-12">
      <TaskProvider initialTask={initialTasks}>
        <h2 className="text-center">
          React Query로 Optimistic Updates구현하기
        </h2>
        <TodoListView />
      </TaskProvider>
    </div>
  );
}

V4.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
