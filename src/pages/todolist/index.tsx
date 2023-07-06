import { ChangeEvent, useState } from 'react';
import Button from './components/Button';
import Input from './components/Input';
import Checkbox from './components/Checkbox';
import { useInput } from '../../../hooks/useInput';
import { useCheckbox } from '../../../hooks/useCheckbox';

const TodoList = () => {
  const { inputValue, setInputValue, handleInput } = useInput('');
  const { isChecked, setIsChecked, handleCheck } = useCheckbox(false);

  return (
    <div className="flex items-center justify-center h-screen max-w-5xl mx-auto bg-blue-100">
      <div className="w-[600px] h-[800px]  bg-gray-50 ">
        <div className="flex flex-col items-center h-full gap-6 px-10 py-9">
          <h1>To-do List</h1>
          <div className="flex w-full gap-6">
            <Input
              value={inputValue}
              onChange={handleInput}
              className="flex-1 border-none outline-none h-9"
            />
            <Button
              onClick={() => {
                alert(inputValue);
              }}
              className="w-8 h-8 text-xl bg-slate-400"
            >
              +
            </Button>
          </div>
          <h2>Tasks</h2>
          <div>
            <Checkbox checked={isChecked} onChange={handleCheck} />
            <Input
              value={inputValue}
              onChange={handleInput}
              className="border-none outline-none"
            />
            <Button
              onClick={() => {
                alert(inputValue);
              }}
              className=" bg-slate-400"
            >
              삭제
            </Button>
          </div>
          <h2>Tasks Done</h2>
          <div>
            <Checkbox checked={isChecked} onChange={handleCheck} />
            <Input
              value={inputValue}
              onChange={handleInput}
              className="border-none outline-none"
            />
            <Button
              onClick={() => {
                alert(inputValue);
              }}
              className=" bg-slate-400"
            >
              삭제
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
