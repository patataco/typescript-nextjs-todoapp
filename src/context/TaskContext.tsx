import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { Task } from '@/type/type';

type InitialTask = {
  initialTask: Task[];
};

interface TaskContextProps {
  tasks: Task[];
  addTask: (value: string) => void;
  updateTask: (selectedTask: Task) => void;
  deleteTask: (selectedTask: Task) => void;
}
export const TaskContext = createContext<TaskContextProps | undefined>(
  undefined
);

export type TaskProviderProps = PropsWithChildren<InitialTask>;

export const TaskProvider = ({ initialTask, children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTask);
  const addTask = (value: string) => {
    setTasks((prev) => [
      ...prev,
      {
        id: new Date().getTime().toString(36),
        title: value,
        content: '',
        categories: [],
        status: 'inProgress',
        startDateTime: new Date(),
        dueDateTime: null,
        createdDateTime: new Date(),
        lastModifiedDateTime: new Date(),
      },
    ]);
  };

  const updateTask = (selectedTask: Task) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === selectedTask.id) {
        return { ...task, ...selectedTask };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (selectedTask: Task) => {
    const updatedTask = tasks.filter((task) => task !== selectedTask);
    setTasks(updatedTask);
  };
  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
};
