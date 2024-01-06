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
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      const updatedTask = { ...task, title: inputValue };
      updateTask(updatedTask);
      saveEdit();
      return;
    }
    if (e.key === 'Escape' && !e.nativeEvent.isComposing) {
      setInputValue(task.title);
      saveEdit();
    }
  };

  return (
    <li
      key={task.id}
      className=" group flex w-full items-center gap-2 p-1 shadow-[0_3px_3px_-3px_rgba(0,0,0,0.3)]"
    >
      <Checkbox
        checked={task.status === 'completed'}
        onChange={handleCheck}
        data-testid={task.title}
        id={task.id ?? ''}
        className={
          'relative block h-5 w-5 cursor-pointer rounded-full border border-blue-300'
        }
      />
      <div onClick={handleClickTitle} className="flex-1">
        {titleStatus ? (
          <Input
            value={inputValue}
            className={`${
              task.status === 'completed' ? 'line-through' : ''
            } h-8 w-full text-blue-950`}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onBlur={handleInputFocusing}
            autoFocus
          />
        ) : (
          <p
            className={`${
              task.status === 'completed' ? 'text-slate-300 line-through' : ''
            } w-full max-w-[450px] overflow-hidden whitespace-pre-wrap text-blue-950`}
          >
            {inputValue}
          </p>
        )}
      </div>
      <Button
        name="delete"
        data-testid={`button-${task.title}`}
        className="invisible h-10 w-10 text-sm text-slate-400 group-hover:visible "
        onClick={handleDeleteButtonClick}
      >
        ✖️
      </Button>
      {/* <div className="w-[80px] truncate text-sm">{`clientId: ${task.clientId}`}</div>*/}
      {/*<div className="w-[80px] truncate text-sm">{`serverId: ${task.id}`}</div>*/}
    </li>
  );
};

export default TaskItem;
