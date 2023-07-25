import { useQueryClient } from '@tanstack/react-query';

import { NewTask } from '@/api/addTasks';
import {
  useAddTasks,
  useDeleteTasks,
  useUpdateTasks,
} from '@/service/mutation/useMutateTasks';
import { useTasks } from '@/service/useTasks';
import { Task } from '@/type/type';

export const useTasksQuery = () => {
  const queryClient = useQueryClient();
  const updateMutation = useUpdateTasks();
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

  const deleteTask = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (e) {
      console.log(e);
    }
  };

  const addTask = async (value: string) => {
    const newTask: NewTask = {
      title: value,
      content: value,
    };

    try {
      await addMutation.mutateAsync(newTask);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleTaskStatus = async (selectedTask: Task) => {
    const changedTask = tasks?.find((task) => task.id === selectedTask.id);
    try {
      if (changedTask) {
        const newStatus: Task['status'] =
          changedTask.status === 'completed' ? 'inProgress' : 'completed';
        const changedItem = {
          ...changedTask,
          status: newStatus,
        };
        await updateMutation.mutateAsync(changedItem);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return { tasks, updateTask, deleteTask, addTask, toggleTaskStatus };
};
