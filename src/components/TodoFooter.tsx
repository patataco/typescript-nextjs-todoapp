import { useTasks } from '@/hooks/useTasks';

import Button from './Button';

const TodoFooter = () => {
  const { deleteAllTasks } = useTasks();
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
