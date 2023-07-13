import TodoListView from '@/components/TodoListView';
import { TaskProvider, useTasks } from '@/context/TaskContext';
import { Task } from '@/type/type';
import { useEffect, useState } from 'react';

export default function Home() {
  const [initialTasks, setInitialTasks] = useState(null);
  useEffect(() => {
    const tasksInStorage = localStorage.getItem('tasks');
    console.log(tasksInStorage);
    if (tasksInStorage) {
      const newTasks = JSON.parse(tasksInStorage);

      setInitialTasks(newTasks);
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
