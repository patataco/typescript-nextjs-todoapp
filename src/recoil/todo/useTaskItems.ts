import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { TaskContextProps } from '@/context/TaskContext';
import { Task } from '@/type/type';

import { tasksState } from './atom';

export const useTasksItems: () => TaskContextProps = () => {
  const [tasks, setTasks] = useRecoilState(tasksState);

  useEffect(() => {
    const tasksInStorage = localStorage.getItem('tasks');
    console.log(tasksInStorage);
    debugger;
    if (tasksInStorage) {
      const newTasks = JSON.parse(tasksInStorage);

      setTasks(newTasks);
    }
  }, []);

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

  return {
    tasks,
    setTasks,
    addTask,
    updateTask,
    toggleTaskStatus,
    deleteAllTasks,
    deleteTask,
  };
};
