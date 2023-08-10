import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addTasks } from '@/api/addTasks';
import { deleteTasks } from '@/api/deleteTasks';
import { updateTasks } from '@/api/updateTasks';
import { Task } from '@/type/type';

import { QUERY_KEY_TASKS } from '../useTasks';

export const useUpdateTasks = () => {
  const queryClient = useQueryClient();
  return useMutation(updateTasks, {
    onMutate: async (updatedTask: Task) => {
      await queryClient.cancelQueries([QUERY_KEY_TASKS]);
      const previousTasks = queryClient.getQueryData([QUERY_KEY_TASKS]);
      queryClient.setQueryData([QUERY_KEY_TASKS], (old: Task[] | undefined) => {
        if (!old) throw new Error('No tasks has founded');
        return old.map((item) => {
          if (item.clientId === updatedTask.clientId) {
            return { ...item, ...updatedTask };
          }
          return item;
        });
      });
      return { previousTasks };
    },

    onError: (err, newTask, context) => {
      if (context) {
        queryClient.setQueryData([QUERY_KEY_TASKS], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_TASKS],
      });
    },
  });
};

export const useAddTasks = () => {
  const queryClient = useQueryClient();
  return useMutation(addTasks, {
    onMutate: async (task: Task) => {
      await queryClient.cancelQueries([QUERY_KEY_TASKS]);
      const previousTasks = queryClient.getQueryData([QUERY_KEY_TASKS]);
      queryClient.setQueryData([QUERY_KEY_TASKS], (old: Task[] | undefined) => {
        if (!old) return undefined;
        return [...old, task];
      });
      return { previousTasks };
    },

    onError: (err, newTask, context) => {
      if (context) {
        queryClient.setQueryData([QUERY_KEY_TASKS], context.previousTasks);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_TASKS],
      });
    },
  });
};

export const useDeleteTasks = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteTasks, {
    onMutate: async (task: Task) => {
      await queryClient.cancelQueries([QUERY_KEY_TASKS]);
      const previousTasks = queryClient.getQueryData([QUERY_KEY_TASKS]);
      queryClient.setQueryData([QUERY_KEY_TASKS], (old: Task[] | undefined) => {
        if (!old) return undefined;
        return old.filter((item) => item !== task);
      });
      return { previousTasks };
    },

    onError: (err, newTask, context) => {
      if (context) {
        queryClient.setQueryData([QUERY_KEY_TASKS], context.previousTasks);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_TASKS],
      });
    },
  });
};
