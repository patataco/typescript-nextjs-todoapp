import { useState } from 'react';
import { KeyboardEvent } from 'react';

import { Task } from '@/type/type';

import { useInput } from '../../hooks/useInput';
import { useTasksManager } from '../../hooks/useTaskManager';

import Button from './Button';
import Checkbox from './Checkbox';
import Input from './Input';

const TaskItem = ({ task }: { task: Task }) => {
  const { inputValue, setInputValue, handleInput } = useInput(task.title);
  // const { updateTask, toggleTaskStatus, deleteTask } = useTasksContext();
  const { updateTask, toggleTaskStatus, deleteTask } = useTasksManager();
  const [titleStatus, setTitleStatus] = useState(false);

  const saveEdit = () => {
    setTitleStatus(false);
  };
  const handleCheck = () => {
    toggleTaskStatus(task);
  };

  const handleClickTitle = () => {
    setTitleStatus(true);
    focus();
  };

  const handleInputFocusing = () => {
    saveEdit();
  };
  const handleDeleteButtonClick = () => {
    deleteTask(task);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      saveEdit();
      return;
    }
    if (e.key === 'Escape' && e.nativeEvent.isComposing === false) {
      setInputValue(task.title);
      saveEdit();
    }
  };
  return (
    <li
      key={task.id}
      className="flex w-full items-center gap-2 shadow-[0_-1px_0_0_inset]"
    >
      <Checkbox
        checked={task.status === 'completed'}
        onChange={handleCheck}
        data-testid={task.title}
        id={task.title}
      >
        {task.title}
      </Checkbox>
      <div onClick={handleClickTitle} className="flex-1">
        {titleStatus ? (
          <Input
            value={inputValue}
            className={`${
              task.status === 'completed' ? 'line-through' : ''
            } h-8 w-full`}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onBlur={handleInputFocusing}
            autoFocus
          />
        ) : (
          <p
            className={`${
              task.status === 'completed' ? 'line-through' : ''
            } w-full max-w-[450px] overflow-hidden whitespace-pre-wrap`}
          >
            {inputValue}
          </p>
        )}
      </div>
      <Button
        name="delete"
        data-testid={`button-${task.title}`}
        className="h-10 w-10 text-sm text-slate-400"
        onClick={handleDeleteButtonClick}
      >
        X
      </Button>
    </li>
  );
};

export default TaskItem;
