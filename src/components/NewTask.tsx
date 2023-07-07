import Button from '@/components/Button';
import Input from '@/components/Input';

import { useInput } from '../../hooks/useInput';

const NewTask = () => {
  const { inputValue, setInputValue, handleInput } = useInput('');
  return (
    <div className="flex w-full gap-6">
      <Input
        value={inputValue}
        onChange={handleInput}
        className="h-9 flex-1 border-none outline-none"
      />
      <Button
        onClick={() => {
          alert(inputValue);
        }}
        className="h-8 w-8 bg-slate-400 text-xl"
      >
        +
      </Button>
    </div>
  );
};

export default NewTask;
