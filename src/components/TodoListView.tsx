import { useMemo } from 'react';

import TasksList from '@/components/TasksList';
import { useTasks } from '@/hooks/useTasks';
import { Task } from '@/type/type';

import { useCheckbox } from '../../hooks/useCheckbox';

import NewTask from './NewTask';
import TodoFooter from './TodoFooter';

const TodoListView = () => {
  const { isChecked, setIsChecked, handleCheck } = useCheckbox(false);
  const { tasks, deleteTask, addTask, updateTask } = useTasks();

  const uncompletedList = useMemo(
    () => tasks.filter((task: Task) => task.status !== 'completed'),
    [tasks]
  );

  const completedList = useMemo(
    () => tasks.filter((task: Task) => task.status === 'completed'),
    [tasks]
  );

  return (
    <div className="mx-auto flex h-screen max-w-5xl items-center justify-center bg-blue-100 ">
      <div className="h-[800px] w-[600px]  bg-gray-50 ">
        <div className="flex h-full flex-col items-center gap-6 px-10 py-9">
          <h1>To-do List</h1>
          <NewTask />
          <h2>Tasks</h2>
          <TasksList data-testid="inProgress-section" tasks={uncompletedList} />
          <h2>Tasks Done</h2>
          <TasksList data-testid="completed-section" tasks={completedList} />
          <TodoFooter />
        </div>
      </div>
    </div>
  );
};

export default TodoListView;
