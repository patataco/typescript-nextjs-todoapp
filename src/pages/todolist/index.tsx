import { useState } from 'react';
import Button from './components/Button';
import Input from './components/Input';
import Checkbox from './components/Checkbox';

const TodoList = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const item = { id: 1, label: '예시' };
  return (
    <>
      <Checkbox item={item} selectedItems={selectedItems} />
      <Input inputValue={inputValue} setInputValue={setInputValue} />
      <Button
        onClick={() => {
          alert(inputValue);
        }}
      >
        버튼
      </Button>
    </>
  );
};

export default TodoList;
