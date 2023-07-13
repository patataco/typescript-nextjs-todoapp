import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { Task } from '@/type/type';

type InitialTaskProps = {
  initialTask: Task[];
};

interface TaskContextProps {
  tasks: Task[];
  addTask: (value: string) => void;
  updateTask: (selectedTask: Task) => void;
  deleteTask: (selectedTask: Task) => void;
  toggleTaskStatus: (selectedTask: Task) => void;
  deleteAllTasks: () => void;
}
export const TaskContext = createContext<TaskContextProps | undefined>(
  undefined
);

export type TaskProviderProps = PropsWithChildren<InitialTaskProps>;

export const TaskProvider = ({ initialTask, children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTask);

  // const updateStorage = () => {
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // };

  const addTask = (value: string) => {
    const newTask: Task = {
      id: new Date().getTime().toString(36),
      title: value,
      content: '',
      categories: [],
      status: 'inProgress',
      startDateTime: new Date(),
      dueDateTime: null,
      createdDateTime: new Date(),
      lastModifiedDateTime: new Date(),
    };
    // const updatedTasks = [...tasks, newTask];
    // localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks((prev) => [...prev, newTask]);
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

  const toggleTaskStatus = (selectedTask: Task) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === selectedTask.id) {
        const newStatus: Task['status'] =
          task.status === 'completed' ? 'inProgress' : 'completed';
        return {
          ...task,
          status: newStatus,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  const deleteTask = (selectedTask: Task) => {
    const updatedTask = tasks.filter((task) => task !== selectedTask);
    setTasks(updatedTask);
  };

  const deleteAllTasks = () => {
    console.log(tasks);
    const updatedTask = tasks.filter((task) => task.status !== 'completed');
    console.log(updatedTask);
    setTasks(updatedTask);
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        deleteAllTasks,
      }}
    >
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
