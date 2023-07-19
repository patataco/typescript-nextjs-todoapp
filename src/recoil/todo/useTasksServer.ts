import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { TaskContextProps } from '@/context/TaskContext';
import { addTasks, NewTask } from '@/pages/api/addTasks';
import { deleteTasks } from '@/pages/api/deleteTasks';
import { getTasks } from '@/pages/api/getTasks';
import { updateTasks } from '@/pages/api/updateTasks';
import { Task } from '@/type/type';

import { tasksServer } from './atom';

export const useTasksServer: () => TaskContextProps = () => {
  const [tasks, setTasks] = useRecoilState(tasksServer);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchData = async () => {
        const data = await getTasks();
        setTasks(data);
      };

      fetchData();
    }
  }, []);

  const addTask = async (value: string) => {
    const newTask: NewTask = {
      title: value,
      content: value,
    };

    await addTasks(newTask);
    const data = await getTasks();
    setTasks(data);
  };

  const updateTask = async (selectedTask: Task) => {
    await updateTasks(selectedTask);
    const data = await getTasks();
    setTasks(data);
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
  const deleteTask = async (selectedTask: Task) => {
    const { id, ...rest } = selectedTask;
    await deleteTasks(id);
    const data = await getTasks();
    setTasks(data);
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
