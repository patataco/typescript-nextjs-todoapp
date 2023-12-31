import { v4 as uuidv4 } from 'uuid';

import { TaskContextProps } from '@/context/TaskContext';
import {
  useAddTasks,
  useDeleteTasks,
  useStatusUpdateTasks,
  useUpdateTasks,
} from '@/service/mutation/useMutateTasks';
import { useTasks } from '@/service/useTasks';
import { Task } from '@/type/type';

export const useTasksQuery: () => Omit<TaskContextProps, 'setTasks'> = () => {
  const updateMutation = useUpdateTasks();
  const statusMutation = useStatusUpdateTasks();
  const deleteMutation = useDeleteTasks();
  const addMutation = useAddTasks();

  const { data: tasks } = useTasks();

  const updateTask = async ({ id, ...rest }: Task) => {
    try {
      await updateMutation.mutateAsync({ id, ...rest });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTask = async (task: Task) => {
    try {
      await deleteMutation.mutateAsync(task);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteAllTasks = async () => {
    if (!tasks) throw new Error('No tasks have founded');
    const tasksToBeDeleted = tasks?.filter(
      (task) => task.status === 'completed'
    );
    try {
      await Promise.all(
        tasksToBeDeleted.map((task) => {
          deleteTask(task);
        })
      );
    } catch (e) {
      console.log(e);
    }
  };
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

    try {
      await addMutation.mutateAsync(newTask);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleTaskStatus = async (selectedTask: Task) => {
    if (!tasks) throw new Error('tasks is null');

    try {
      const newStatus =
        selectedTask.status === 'completed' ? 'inProgress' : 'completed';
      const updatedTask: Task = { ...selectedTask, status: newStatus };
      await statusMutation.mutateAsync(updatedTask);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    tasks,
    updateTask,
    deleteTask,
    addTask,
    toggleTaskStatus,
    deleteAllTasks,
  };
};
