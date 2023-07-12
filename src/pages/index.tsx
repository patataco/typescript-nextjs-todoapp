import TodoListView, { tasks } from '@/components/TodoListView';
import { TaskProvider } from '@/context/TaskContext';
import { Task } from '@/type/type';
import { useEffect } from 'react';

export default function Home() {
  return (
    <>
      <TaskProvider initialTask={tasks}>
        <TodoListView />
      </TaskProvider>
    </>
  );
}
