import { KeyboardEvent } from 'react';

import Button from '@/components/Button';
import Input from '@/components/Input';

import { useInput } from '../../hooks/useInput';
import { useTasksManager } from '../../hooks/useTaskManager';

const NewTask = () => {
  const { inputValue, setInputValue, handleInput } = useInput('');
  const { addTask } = useTasksManager();

  const addTaskItem = () => {
    addTask(inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      if (inputValue.length < 1) {
        e.preventDefault();
      } else {
        addTaskItem();
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
        className="h-9 flex-1 border-none outline-none"
      />
      <Button
        disabled={inputValue.length < 1}
        onClick={handleAddButtonClick}
        className="h-8 w-8 bg-slate-400 text-xl"
      >
        +
      </Button>
    </div>
  );
};

export default NewTask;
