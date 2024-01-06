import { useMemo } from 'react';

import TasksList from '@/components/TasksList';
import { Task } from '@/type/type';

import { useTasksManager } from '../../hooks/useTaskManager';

import NewTask from './NewTask';
import TodoFooter from './TodoFooter';

const TodoListView = () => {
  const { tasks } = useTasksManager();

  const sortedTasks = useMemo(() => {
    if (!tasks) return [];
    const sorted = [...tasks].sort((a, z) => {
      if (a.title > z.title) return 1;
      if (a.title < z.title) return -1;
      return 0;
    });
    return sorted;
  }, [tasks]);

  if (!tasks) return;

  const uncompletedList = sortedTasks.filter(
    (task: Task) => task.status !== 'completed'
  );

  const completedList = sortedTasks.filter(
    (task: Task) => task.status === 'completed'
  );
  return (
    <div className="flex h-full items-center justify-center bg-blue-100">
      <div className="mx-auto flex max-w-5xl items-center justify-center ">
        <div className="h-[800px] w-[600px]  bg-gray-50 ">
          <div className="flex flex-col items-center gap-6 px-10 py-9">
            <h1 className="text-blue-950">ToDo List</h1>
            <NewTask />
            <div className="flex w-full flex-col">
              <TasksList
                data-testid="inProgress-section"
                tasks={uncompletedList}
              />
              <TasksList
                data-testid="completed-section"
                tasks={completedList}
              />
            </div>
            <TodoFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoListView;
