import TasksList from '@/components/TasksList';
import { Task } from '@/type/type';

import { useTasksQuery } from '../../hooks/useTasksQuery';

import NewTask from './NewTask';
import TodoFooter from './TodoFooter';

const TodoListView = () => {
  const { tasks } = useTasksQuery();

  if (!tasks) return;

  const uncompletedList = tasks.filter(
    (task: Task) => task.status !== 'completed'
  );

  const completedList = tasks.filter(
    (task: Task) => task.status === 'completed'
  );
  return (
    <div className="bg-blue-100">
      <div className="mx-auto flex h-screen max-w-5xl items-center justify-center ">
        <div className="h-[800px] w-[600px]  bg-gray-50 ">
          <div className="flex h-full flex-col items-center gap-6 px-10 py-9">
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
