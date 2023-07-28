import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addTasks } from '@/api/addTasks';
import { deleteTasks } from '@/api/deleteTasks';
import { updateTasks } from '@/api/updateTasks';
import { Task } from '@/type/type';

import { QUERY_KEY_TASKS } from '../useTasks';


export const useUpdateTasks = () => {
  const queryClient = useQueryClient();
  return useMutation(updateTasks, {
    onMutate: async (newTask: Task) => {
      await queryClient.cancelQueries([QUERY_KEY_TASKS]);
      const previousTasks = queryClient.getQueryData([QUERY_KEY_TASKS]);
      queryClient.setQueryData([QUERY_KEY_TASKS], (old: Task[] | undefined) => {
        if (old) {
          return [...old, newTask];
        }
        return [newTask];
      });

      return { previousTasks };
    },

    onError: (err, newTask, context) => {
      if (context) {
        queryClient.setQueryData([QUERY_KEY_TASKS], context.previousTasks);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_TASKS],
      });
    },
  });
};

export const useAddTasks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTasks,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_TASKS],
      });
    },
  });
};

export const useDeleteTasks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTasks,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_TASKS],
      });
    },
  });
};
