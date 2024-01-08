import { useMemo } from 'react';

import TasksList from '@/components/TasksList';
import { ScrollArea } from '@/components/ui/scroll-area';
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
    <div className="flex h-full justify-center">
      <div className="flex h-[600px] w-[360px] flex-col rounded-md bg-white md:h-[720px] md:w-[600px] md:max-w-none">
        <div className="flex flex-col items-center gap-6 px-10 py-6 ">
          <h2 className="text-blue-950">ToDo List</h2>
          <NewTask />
        </div>
        <ScrollArea className="flex flex-col  px-10 pb-4">
          <div className="flex flex-col gap-3">
            <TasksList
              data-testid="inProgress-section"
              tasks={uncompletedList}
            />
            <TasksList data-testid="completed-section" tasks={completedList} />
            <TodoFooter />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TodoListView;
