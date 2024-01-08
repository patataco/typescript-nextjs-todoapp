import { useTasksManager } from '../../hooks/useTaskManager';

import Button from './Button';

const TodoFooter = () => {
  const { deleteAllTasks } = useTasksManager();

  const handleClearButton = () => {
    deleteAllTasks();
  };
  return (
    <div className="mx-auto">
      <Button
        onClick={handleClearButton}
        className="rounded-lg bg-slate-200 px-2 py-1"
      >
        ✨ Clear All
      </Button>
    </div>
  );
};

export default TodoFooter;
