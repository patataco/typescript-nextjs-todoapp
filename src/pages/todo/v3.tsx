import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import TodoListView from '@/components/TodoListView';
import { TaskProvider } from '@/context/TaskContext';
import { tasksServer, versionAtom } from '@/recoil/todo/atom';
import { Task } from '@/type/type';

import { getTasks } from '../../api/getTasks';

export default function V3() {
  const setVersionType = useSetRecoilState(versionAtom);
  const [initialTasks, setInitialTasks] = useState<Task[] | null>(null);
  const setTasks = useSetRecoilState(tasksServer);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTasks();
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
        <TodoListView />
      </TaskProvider>
    </>
  );
}
