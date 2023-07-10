import TodoListView, { tasks } from '@/components/TodoListView';
import { TaskProvider } from '@/context/TaskContext';

export default function Home() {
  return (
    <>
      <TaskProvider initialTask={tasks}>
        <TodoListView />
      </TaskProvider>
    </>
  );
}
