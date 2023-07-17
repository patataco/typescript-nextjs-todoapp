import { useTasksItems } from '@/recoil/todo/useTaskItems';

import Button from './Button';

const TodoFooter = () => {
  // const { deleteAllTasks } = useTasksContext();
  const { deleteAllTasks } = useTasksItems();

  const handleClearButton = () => {
    deleteAllTasks();
  };
  return (
    <div>
      <Button onClick={handleClearButton}>Clear All</Button>
    </div>
  );
};

export default TodoFooter;
