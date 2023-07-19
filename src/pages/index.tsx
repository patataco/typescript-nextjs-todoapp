import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';

import Title from '@/components/Title';
import { Task } from '@/type/type';

export default function Home() {
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
        <Title />
      </RecoilRoot>
    </>
  );
}
