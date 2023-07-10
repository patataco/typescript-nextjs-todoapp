import Home from '../pages/index';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TaskProvider } from '@/context/TaskContext';

describe('Todo App', () => {
  it('renders the todo app', () => {
    render(
      <TaskProvider initialTask={[]}>
        <Home />
      </TaskProvider>
    );
  });
  it('추가 버튼을 가진 입력 영역이 보입니다', () => {
    render(
      <TaskProvider initialTask={[]}>
        <Home />
      </TaskProvider>
    );
    const addButton = screen.getByRole('button', { name: '+' });
    const newTaskInput = screen.getByPlaceholderText('todo');
    expect(addButton).toBeInTheDocument();
    expect(newTaskInput).toBeInTheDocument();
  });
});
