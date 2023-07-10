import Button from '@/components/Button';
import Input from '@/components/Input';

import { useInput } from '../../hooks/useInput';
import { useTasks } from '@/context/TaskContext';

const NewTask = () => {
  const { inputValue, setInputValue, handleInput } = useInput('');
  const { tasks, deleteTask, addTask, updateTask } = useTasks();

  return (
    <div className="flex w-full gap-6">
      <Input
        placeholder="todo"
        value={inputValue}
        onChange={handleInput}
        className="flex-1 border-none outline-none h-9"
      />
      <Button
        onClick={() => addTask(inputValue)}
        className="w-8 h-8 text-xl bg-slate-400"
      >
        +
      </Button>
    </div>
  );
};

export default NewTask;
