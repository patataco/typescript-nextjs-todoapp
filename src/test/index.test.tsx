import Home from '../pages/index';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TaskProvider } from '@/context/TaskContext';
import TasksList from '@/components/TasksList';
import { Task } from '@/type/type';
import TodoListView from '@/components/TodoListView';

describe('Todo App', () => {
  it('추가 버튼을 가진 입력 영역이 보입니다', () => {
    render(
      <TaskProvider initialTask={[]}>
        <Home />
      </TaskProvider>
    );
    const addButton = screen.getByRole('button', { name: '+' });
    const newTaskInput = screen.getByPlaceholderText('todo');
    const taskList = screen.getAllByTestId('task-list');
    expect(addButton).toBeInTheDocument();
    expect(newTaskInput).toBeInTheDocument();
    expect(taskList).toBeInTheDocument;
  });

  it('테스크 리스트가 존재하면 테스크 리스트가 보입니다', () => {
    const task: Task[] = [
      {
        id: '3',
        title: '보고서 작성',
        content: '월간 보고서 작성 및 제출',
        categories: ['업무', '보고서'],
        status: 'completed',
        startDateTime: new Date('2023-07-01T09:00:00'),
        dueDateTime: new Date('2023-07-05T18:00:00'),
        createdDateTime: new Date('2023-06-30T17:30:00'),
        lastModifiedDateTime: new Date('2023-07-05T17:45:00'),
      },
    ];
    render(
      <>
        <TasksList tasks={task} />
      </>
    );

    const taskTitle = screen.getByDisplayValue('보고서 작성');
    expect(taskTitle).toBeInTheDocument;
  });

  it('테스크가 존재하지 않으면 테스크리스트에 Empty라는 문구가 출력됩니다', () => {
    const task: Task[] = [];
    render(
      <>
        <TasksList tasks={task} />
      </>
    );

    const empty = screen.getByText('Empty');
    expect(empty).toBeInTheDocument;
  });

  it('완료된 테스크와 미완료된 테스크가 모두 존재할 때 각 테스크 리스트 영역에 테스크들이 표시됩니다', () => {
    const task: Task[] = [
      {
        id: '3',
        title: '보고서 작성',
        content: '월간 보고서 작성 및 제출',
        categories: ['업무', '보고서'],
        status: 'inProgress',
        startDateTime: new Date('2023-07-01T09:00:00'),
        dueDateTime: new Date('2023-07-05T18:00:00'),
        createdDateTime: new Date('2023-06-30T17:30:00'),
        lastModifiedDateTime: new Date('2023-07-05T17:45:00'),
      },
      {
        id: '4',
        title: '회의록 작성',
        content: '월간 보고서 작성 및 제출',
        categories: ['업무', '보고서'],
        status: 'completed',
        startDateTime: new Date('2023-07-01T09:00:00'),
        dueDateTime: new Date('2023-07-05T18:00:00'),
        createdDateTime: new Date('2023-06-30T17:30:00'),
        lastModifiedDateTime: new Date('2023-07-05T17:45:00'),
      },
    ];
    render(
      <>
        <TaskProvider initialTask={task}>
          <TodoListView />
        </TaskProvider>
      </>
    );

    const inProgress = screen.getByTestId('inProgress-section');
  });
});
