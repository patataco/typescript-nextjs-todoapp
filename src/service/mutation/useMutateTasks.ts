import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addTasks } from '@/api/addTasks';
import { deleteTasks } from '@/api/deleteTasks';
import { updateTasks } from '@/api/updateTasks';

import { QUERY_KEY_TASKS } from '../useTasks';

export const useUpdateTasks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTasks,
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
