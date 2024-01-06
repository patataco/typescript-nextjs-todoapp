import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { getTasks } from '@/api/getTasks';
import Layout from '@/components/Layout';
import TodoListView from '@/components/TodoListView';
import { TaskProvider } from '@/context/TaskContext';
import { tasksServer, versionAtom } from '@/recoil/todo/atom';
import { Task } from '@/type/type';

export default function V3() {
  const setVersionType = useSetRecoilState(versionAtom);
  const [initialTasks, setInitialTasks] = useState<Task[] | null>([]);
  const setTasks = useSetRecoilState(tasksServer);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTasks();
      setInitialTasks(data);
      setTasks(data);
    };
    setVersionType('server');
    fetchData();
  }, [setVersionType, setTasks]);

  if (!initialTasks) return;

  return (
    <>
      <TaskProvider initialTask={initialTasks}>
        <h1>REST API</h1>
        <TodoListView />
      </TaskProvider>
    </>
  );
}

V3.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
