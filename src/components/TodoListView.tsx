import TasksList from '@/components/TasksList';
import { Task } from '@/type/type';
import { useCheckbox } from '../../hooks/useCheckbox';

import { TaskProvider, useTasks } from '@/context/TaskContext';
import NewTask from './NewTask';
import TodoFooter from './TodoFooter';
import { useEffect } from 'react';

const TodoListView = () => {
  const { isChecked, setIsChecked, handleCheck } = useCheckbox(false);
  const { tasks, deleteTask, addTask, updateTask } = useTasks();

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="flex items-center justify-center h-screen max-w-5xl mx-auto bg-blue-100 ">
      <div className="h-[800px] w-[600px]  bg-gray-50 ">
        <div className="flex flex-col items-center h-full gap-6 px-10 py-9">
          <h1>To-do List</h1>
          <NewTask />
          <h2>Tasks</h2>
          <TasksList
            data-testId="inProgress-section"
            tasks={tasks.filter((task) => task.status !== 'completed')}
          />
          <h2>Tasks Done</h2>
          <TasksList
            data-testId="completed-section"
            tasks={tasks.filter((task) => task.status === 'completed')}
          />
          <TodoFooter />
        </div>
      </div>
    </div>
  );
};

export default TodoListView;
