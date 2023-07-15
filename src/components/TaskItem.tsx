import { useState } from 'react';
import { KeyboardEvent } from 'react';

import { useTasks } from '@/hooks/useTasks';
import { Task } from '@/type/type';

import { useInput } from '../../hooks/useInput';

import Button from './Button';
import Checkbox from './Checkbox';
import Input from './Input';

const TaskItem = ({ task }: { task: Task }) => {
  const { inputValue, setInputValue, handleInput } = useInput(task.title);
  const { updateTask, toggleTaskStatus, deleteTask } = useTasks();
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
    <li key={task.id} className="flex ">
      <Checkbox
        checked={task.status === 'completed'}
        onChange={handleCheck}
        data-testid={task.title}
      />
      <div className="flex" onClick={handleClickTitle}>
        {titleStatus ? (
          <Input
            value={inputValue}
            className={task.status === 'completed' ? 'line-through' : ''}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onBlur={handleInputFocusing}
            autoFocus
          />
        ) : (
          <p className={task.status === 'completed' ? 'line-through' : ''}>
            {inputValue}
          </p>
        )}
      </div>
      <Button
        name="delete"
        data-testid={`button-${task.title}`}
        className="h-10 w-10 bg-delete-button bg-cover"
        onClick={handleDeleteButtonClick}
      />
    </li>
  );
};

export default TaskItem;
