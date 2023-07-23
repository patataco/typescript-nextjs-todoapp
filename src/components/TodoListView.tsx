import { useMemo } from 'react';

import TasksList from '@/components/TasksList';
import { Task } from '@/type/type';

import { useCheckbox } from '../../hooks/useCheckbox';
import { useTasksManager } from '../../hooks/useTaskManager';

import NewTask from './NewTask';
import TodoFooter from './TodoFooter';

const TodoListView = () => {
  const { isChecked, setIsChecked, handleCheck } = useCheckbox(false);

  const { tasks } = useTasksManager();
  console.log(useTasksManager());
  const uncompletedList = useMemo(
    () => tasks.filter((task: Task) => task.status !== 'completed'),
    [tasks]
  );
  const completedList = useMemo(
    () => tasks.filter((task: Task) => task.status === 'completed'),
    [tasks]
  );

  return (
    <div className="bg-blue-100">
      <div className="flex items-center justify-center h-screen max-w-5xl mx-auto ">
        <div className="h-[800px] w-[600px]  bg-gray-50 ">
          <div className="flex flex-col items-center h-full gap-6 px-10 py-9">
            <h1>To-do List</h1>
            <NewTask />

            <TasksList
              data-testid="inProgress-section"
              tasks={uncompletedList}
            />
            <TasksList data-testid="completed-section" tasks={completedList} />
            <TodoFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoListView;
