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
    <div className="flex flex-col items-center gap-8 pt-12">
      <TaskProvider initialTask={initialTasks}>
        <h2>REST API로 Data Fetching하기</h2>
        <TodoListView />
      </TaskProvider>
    </div>
  );
}

V3.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
