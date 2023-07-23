import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRecoilValue } from 'recoil';

import { versionAtom } from '@/recoil/todo/atom';
import { Task } from '@/type/type';

export type InitialTaskProps = {
  initialTask: Task[];
};

export interface TaskContextProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
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
  const versionType = useRecoilValue(versionAtom);

  useEffect(() => {
    if (versionType === 'context')
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

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
    const updatedTask = tasks.filter((task) => task.status !== 'completed');

    setTasks(updatedTask);
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
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

export const useTasksContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
};
