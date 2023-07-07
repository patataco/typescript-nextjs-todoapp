import { useCheckbox } from '../../hooks/useCheckbox';

import Button from './Button';
import Checkbox from './Checkbox';
import Input from './Input';

const TasksList = ({ tasks }: { tasks: Task[] }) => {
  const { isChecked, setIsChecked, handleCheck } = useCheckbox(false);
  return (
    <ul>
      {tasks.map((task) => {
        return (
          <li key={task.id} className="flex ">
            <Checkbox checked={isChecked} onChange={handleCheck} />
            <Input
              value={task.title}
              className={task.status === 'completed' ? 'line-through' : ''}
            />
            <Button className="h-10 w-10 bg-delete-button bg-cover" />
          </li>
        );
      })}
    </ul>
  );
};

export default TasksList;
