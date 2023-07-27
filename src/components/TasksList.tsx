import { HTMLAttributes } from 'react';

import { Task } from '@/type/type';

import { useCheckbox } from '../../hooks/useCheckbox';

import TaskItem from './TaskItem';

type TaskListProps = HTMLAttributes<HTMLUListElement> & { tasks: Task[] };
const TasksList = ({ tasks, ...props }: TaskListProps) => {
  const { isChecked, setIsChecked, handleCheck } = useCheckbox(false);

  return (
    <ul className="w-full" {...props}>
      {tasks.length > 0 ? (
        tasks.map((task) => {
          return <TaskItem key={task.id} task={task} />;
        })
      ) : (
        <p className="hidden">Empty</p>
      )}
    </ul>
  );
};

export default TasksList;
