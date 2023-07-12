import Button from '@/components/Button';
import Input from '@/components/Input';

import { useInput } from '../../hooks/useInput';
import { useTasks } from '@/context/TaskContext';
import { KeyboardEvent } from 'react';

const NewTask = () => {
  const { inputValue, setInputValue, handleInput } = useInput('');
  const { tasks, deleteTask, addTask, updateTask } = useTasks();

  const addTaskItem = () => {
    addTask(inputValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputValue.length < 1) {
        e.preventDefault();
      } else {
        addTaskItem();
        setInputValue('');
      }
    }
  };

  const handleAddButtonClick = () => {
    addTaskItem();
  };

  return (
    <div className="flex w-full gap-6">
      <Input
        placeholder="todo"
        value={inputValue}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        className="flex-1 border-none outline-none h-9"
      />
      <Button
        disabled={inputValue.length < 1}
        onClick={handleAddButtonClick}
        className="w-8 h-8 text-xl bg-slate-400"
      >
        +
      </Button>
    </div>
  );
};

export default NewTask;
