import { useCheckbox } from '../../hooks/useCheckbox';
import { Task } from '@/type/type';
import Button from './Button';
import Checkbox from './Checkbox';
import Input from './Input';
import TaskItem from './TaskItem';

const TasksList = ({ tasks }: { tasks: Task[] }) => {
  const { isChecked, setIsChecked, handleCheck } = useCheckbox(false);

  return (
    <ul data-testid="task-list">
      {tasks.length > 0 ? (
        tasks.map((task) => {
          return <TaskItem key={task.id} task={task} />;
        })
      ) : (
        <p>Empty</p>
      )}
    </ul>
  );
};

export default TasksList;
