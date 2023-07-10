import Input from './Input';
import { Task } from '@/type/type';
import { useCheckbox } from '../../hooks/useCheckbox';
import Checkbox from './Checkbox';
import Button from './Button';

const TaskItem = ({ task }: { task: Task }) => {
  const handleCheck = () => {
    const updatedTask = { ...task, status: 'completed' };
    return updatedTask;
  };
  return (
    <li key={task.id} className="flex ">
      <Checkbox checked={task.status === 'completed'} onChange={handleCheck} />
      <Input
        value={task.title}
        className={task.status === 'completed' ? 'line-through' : ''}
      />
      <Button className="w-10 h-10 bg-cover bg-delete-button" />
    </li>
  );
};

export default TaskItem;
