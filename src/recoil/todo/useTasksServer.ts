import { useRecoilState } from 'recoil';

import { addTasks, NewTask } from '@/api/addTasks';
import { deleteTasks } from '@/api/deleteTasks';
import { getTasks } from '@/api/getTasks';
import { updateTasks } from '@/api/updateTasks';
import { TaskContextProps } from '@/context/TaskContext';
import { Task } from '@/type/type';

import { tasksServer } from './atom';

export const useTasksServer: () => TaskContextProps = () => {
  const [tasks, setTasks] = useRecoilState(tasksServer);

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
    const data = await getTasks();
    setTasks(data);
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
