import { useTasksManager } from '../../hooks/useTaskManager';

import Button from './Button';

const TodoFooter = () => {
  // const { deleteAllTasks } = useTasksContext();
  const { deleteAllTasks } = useTasksManager();

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
