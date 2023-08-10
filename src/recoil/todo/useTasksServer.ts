import { useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import { addTasks } from '@/api/addTasks';
import { deleteTasks } from '@/api/deleteTasks';
import { getTasks } from '@/api/getTasks';
import { updateTasks } from '@/api/updateTasks';
import { TaskContextProps } from '@/context/TaskContext';
import { Task } from '@/type/type';

import { tasksServer } from './atom';

export const useTasksServer: () => TaskContextProps = () => {
  const [tasks, setTasks] = useRecoilState(tasksServer);

  const addTask = async (value: string) => {
    const newTask: Task = {
      clientId: uuidv4(),
      title: value,
      content: value,
      status: 'inProgress',
      startDateTime: new Date(),
      dueDateTime: null,
      createdDateTime: new Date(),
      lastModifiedDateTime: new Date(),
      id: null,
    };

    await addTasks(newTask);
    const { data } = await getTasks();
    setTasks(data);
  };

  const updateTask = async (selectedTask: Task) => {
    await updateTasks(selectedTask);
    const { data } = await getTasks();
    setTasks(data);
  };

  const toggleTaskStatus = async (selectedTask: Task) => {
    const changedTask = tasks.find((task) => task.id === selectedTask.id);
    if (changedTask) {
      const newStatus: Task['status'] =
        changedTask.status === 'completed' ? 'inProgress' : 'completed';
      const changedItem = {
        ...changedTask,
        status: newStatus,
      };
      await updateTasks(changedItem);
    }
    const { data } = await getTasks();
    setTasks(data);
  };

  const deleteTask = async (task: Task) => {
    await deleteTasks(task);
    const { data } = await getTasks();
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
