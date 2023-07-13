import Input from './Input';
import { Task } from '@/type/type';
import { useCheckbox } from '../../hooks/useCheckbox';
import Checkbox from './Checkbox';
import Button from './Button';
import { useState } from 'react';
import { useInput } from '../../hooks/useInput';
import { useTasks } from '@/context/TaskContext';
import { KeyboardEvent } from 'react';

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
        data-testId={task.title}
      />
      <div className="flex" onClick={handleClickTitle}>
        {titleStatus ? (
          <Input
            value={inputValue}
            className={task.status === 'completed' ? 'line-through' : ''}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            autoFocus
            onBlur={handleInputFocusing}
          />
        ) : (
          <p className={task.status === 'completed' ? 'line-through' : ''}>
            {inputValue}
          </p>
        )}
      </div>
      <Button
        data-testId={`button-${task.title}`}
        className="w-10 h-10 bg-cover bg-delete-button"
        onClick={handleDeleteButtonClick}
      />
    </li>
  );
};

export default TaskItem;
