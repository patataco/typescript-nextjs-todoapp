import { useContext } from 'react';

import { TaskContext } from '@/context/TaskContext';
import { Task } from '@/type/type';

interface TaskContextProps {
  tasks: Task[];
  addTask: (value: string) => void;
  updateTask: (selectedTask: Task) => void;
  deleteTask: (selectedTask: Task) => void;
  toggleTaskStatus: (selectedTask: Task) => void;
  deleteAllTasks: () => void;
}

export const useTasks: () => TaskContextProps = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }

  const tasks = [];

  return {
    tasks,
    addTask: () => {},
    deleteTask: () => {},
  };
};
