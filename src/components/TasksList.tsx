import { HTMLAttributes } from 'react';

import { Task } from '@/type/type';

import TaskItem from './TaskItem';

type TaskListProps = HTMLAttributes<HTMLUListElement> & { tasks: Task[] };
const TasksList = ({ tasks, ...props }: TaskListProps) => {
  return (
    <ul className="w-full" {...props}>
      {tasks.length > 0 ? (
        tasks.map((task) => {
          return <TaskItem key={task.clientId} task={task} />;
        })
      ) : (
        <p className="hidden">Empty</p>
      )}
    </ul>
  );
};

export default TasksList;
