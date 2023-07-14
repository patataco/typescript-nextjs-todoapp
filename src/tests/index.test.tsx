import {
  fireEvent,
  getByText,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { TaskProvider } from '@/context/TaskContext';
import TasksList from '@/components/TasksList';
import { Task } from '@/type/type';
import TodoListView from '@/components/TodoListView';
import NewTask from '@/components/NewTask';
import { type } from 'os';
import Checkbox from '../components/Checkbox';
import { after } from 'node:test';

export const tasks: Task[] = [
  {
    id: '1',
    title: '회의 준비',
    content: '다음 주 회의를 위한 준비물 확인',
    categories: ['업무', '회의'],
    status: 'notStarted',
    startDateTime: new Date('2023-07-10T09:00:00'),
    dueDateTime: new Date('2023-07-10T10:00:00'),
    createdDateTime: new Date('2023-07-09T14:30:00'),
    lastModifiedDateTime: new Date('2023-07-09T14:30:00'),
  },
  {
    id: '2',
    title: '프로젝트 개발',
    content: '새로운 기능 추가 및 버그 수정',
    categories: ['업무', '프로젝트'],
    status: 'inProgress',
    startDateTime: new Date('2023-07-05T10:00:00'),
    dueDateTime: new Date('2023-07-15T18:00:00'),
    createdDateTime: new Date('2023-07-03T09:45:00'),
    lastModifiedDateTime: new Date('2023-07-07T15:20:00'),
  },
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
describe('유저는 Task 리스트를 볼 수 있으며, 완료되지 않은 테스크는 상단에, 완료된 테스크는 리스트 하단에 표시됩니다.', () => {
  it('추가 버튼을 가진 입력 영역이 보입니다', () => {
    render(
      <TaskProvider initialTask={[]}>
        <TodoListView />
      </TaskProvider>
    );
    const addButton = screen.getByRole('button', { name: '+' });
    const newTaskInput = screen.getByPlaceholderText('todo');
    expect(addButton).toBeInTheDocument();
    expect(newTaskInput).toBeInTheDocument();
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
      <TaskProvider initialTask={[]}>
        <TasksList tasks={task} />
      </TaskProvider>
    );

    const taskTitle = screen.getByText('보고서 작성');
    expect(taskTitle).toBeInTheDocument();
  });

  it('테스크가 존재하지 않으면 테스크리스트에 Empty라는 문구가 출력됩니다', () => {
    const task: Task[] = [];
    render(
      <>
        <TasksList tasks={task} />
      </>
    );

    const empty = screen.getByText('Empty');
    expect(empty).toBeInTheDocument();
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
    const inProgressTitle = screen.getByText('보고서 작성');
    const completed = screen.getByTestId('completed-section');
    const completedTitle = screen.getByText('회의록 작성');
    expect(inProgress).toContainElement(inProgressTitle);
    expect(completed).toContainElement(completedTitle);
  });
});

describe('유저는 입력영역에 해야되는 일들을 입력하고 리스트에 추가한다.', () => {
  it('유저가 입력영역에 입력하려고 할 때 유저가 입력영역에 아무것도 입력하지 않았으면 추가 버튼은 비활성화되고 텍스트를 입력하면 버튼이 활성화됩니다.', () => {
    render(
      <TaskProvider initialTask={tasks}>
        <NewTask />
      </TaskProvider>
    );
    const input = screen.getByPlaceholderText('todo');
    const button = screen.getByRole('button', { name: '+' });
    expect(button).toBeDisabled();

    //입력
    fireEvent.change(input, { target: { value: 'a' } });
    expect(button).toBeEnabled();
  });

  it('유저가 테스크 내용을 입력하는 영역에 아무것도 입력하지 않았을 때 추가 버튼을 누르거나 엔터키를 눌러도 아무 동작하지 않습니다', () => {
    const { container } = render(
      <TaskProvider initialTask={tasks}>
        <TodoListView />
      </TaskProvider>
    );
    const initialSnapshot = container.innerHTML;

    const input = screen.getByPlaceholderText('todo');
    const button = screen.getByRole('button', { name: '+' });
    fireEvent.click(button);
    expect(container.innerHTML).toMatchSnapshot(initialSnapshot);

    //엔터키
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(container.innerHTML).toMatchSnapshot(initialSnapshot);
  });

  it('유저가 테스크 내용을 입력하는 영역에 입력을 했을 때 추가 버튼을 누르거나 엔터 버튼을 누르면 대기 리스트의 가장 아래에 완료되지 않은 테스크가 추가됩니다.', () => {
    render(
      <TaskProvider initialTask={tasks}>
        <TodoListView />
      </TaskProvider>
    );
    const input = screen.getByPlaceholderText('todo');
    const button = screen.getByRole('button', { name: '+' });
    const inProgress = screen.getByTestId('inProgress-section');

    //추가 버튼 클릭
    fireEvent.change(input, { target: { value: 'new task' } });
    fireEvent.click(button);
    let pElements = inProgress.querySelectorAll('p');
    let lastTaskText = pElements[pElements.length - 1].textContent;
    expect(lastTaskText).toBe('new task');

    //엔터키
    fireEvent.change(input, { target: { value: 'Enter Test' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    pElements = inProgress.querySelectorAll('p');
    lastTaskText = pElements[pElements.length - 1].textContent;
    expect(lastTaskText).toBe('Enter Test');
  });
});

describe('유저가 Task 내용을 편집한다.', () => {
  it('대기리스트에 Tasks가 존재할 때 Tasks 중 내용을 변경하고 싶은 Task의 라벨을 클릭하면 input창으로 변경된다.', () => {
    render(
      <TaskProvider initialTask={tasks}>
        <TodoListView />
      </TaskProvider>
    );

    const input = screen.getByPlaceholderText('todo');
    const button = screen.getByRole('button', { name: '+' });

    fireEvent.change(input, { target: { value: 'new task' } });
    fireEvent.click(button);
    fireEvent.change(input, { target: { value: '' } });

    const inProgress = screen.getByTestId('inProgress-section');
    const task = screen.getByText('new task');

    fireEvent.click(task);
    const taskInput = screen.getByDisplayValue('new task');
    expect(taskInput).toBeInTheDocument();

    //input창에 변경하고 싶은 내용을 적을 수 있게 되는데, input창에는 기존 테스크 내용이 적혀있고 내용 마지막 글자에 포커스가 있다.
  });

  test('input창에 변경하고 싶은 내용을 적을 수 있게 되는데, input창에는 기존 테스크 내용이 적혀있고 내용 마지막 글자에 포커스가 있다.', async () => {
    const user = userEvent.setup();
    render(
      <TaskProvider initialTask={[]}>
        <TodoListView />
      </TaskProvider>
    );
    const input = screen.getByPlaceholderText('todo');
    const button = screen.getByRole('button', { name: '+' });

    fireEvent.change(input, { target: { value: 'new task' } });
    fireEvent.click(button);
    fireEvent.change(input, { target: { value: '' } });

    const task = screen.getByText('new task');

    fireEvent.click(task);
    const taskInput = screen.getByDisplayValue('new task');
    expect(taskInput).toHaveFocus();

    await user.type(taskInput, ' testing');
    expect(taskInput).toHaveValue('new task testing');
  });

  test('input창에 변경 내용을 적고 input 외 영역을 클릭하면 입력한 내용으로 테스크가 변경되고, input창이 없어진다', async () => {
    const user = userEvent.setup();
    render(
      <TaskProvider initialTask={tasks}>
        <TodoListView />
      </TaskProvider>
    );
    const input = screen.getByPlaceholderText('todo');
    const button = screen.getByRole('button', { name: '+' });

    fireEvent.change(input, { target: { value: 'new task' } });
    fireEvent.click(button);
    fireEvent.change(input, { target: { value: '' } });

    const task = screen.getByText('new task');

    fireEvent.click(task);
    const taskInput = screen.getByDisplayValue('new task');
    await user.type(taskInput, ' testing');
    await user.click(input);
    const taskPelement = screen.getByText('new task testing');
    expect(taskPelement).toBeInTheDocument();
  });

  test('input창에 변경 내용을 적고 엔터를 누르면 입력한 내용으로 테스크가 변경되고, input창이 없어진다', async () => {
    const user = userEvent.setup();
    render(
      <TaskProvider initialTask={tasks}>
        <TodoListView />
      </TaskProvider>
    );
    const input = screen.getByPlaceholderText('todo');
    const button = screen.getByRole('button', { name: '+' });

    fireEvent.change(input, { target: { value: 'new task' } });
    fireEvent.click(button);
    fireEvent.change(input, { target: { value: '' } });

    const task = screen.getByText('new task');

    fireEvent.click(task);
    const taskInput = screen.getByDisplayValue('new task');
    await user.type(taskInput, ' testing');

    await userEvent.keyboard('{enter}');
    const taskPelement = screen.getByText('new task testing');
    expect(taskPelement).toBeInTheDocument();
  });
});

describe('유저는 입력영역에 해야되는 일들을 입력하고 리스트에 추가한다.', () => {
  it('유저가 입력영역에 입력하려고 할 때 유저가 입력영역에 아무것도 입력하지 않았으면 추가 버튼은 비활성화되고 텍스트를 입력하면 버튼이 활성화됩니다.', () => {
    render(
      <TaskProvider initialTask={tasks}>
        <NewTask />
      </TaskProvider>
    );
    const input = screen.getByPlaceholderText('todo');
    const button = screen.getByRole('button', { name: '+' });
    expect(button).toBeDisabled();

    //입력
    fireEvent.change(input, { target: { value: 'a' } });
    expect(button).toBeEnabled();
  });

  it('유저가 테스크 내용을 입력하는 영역에 아무것도 입력하지 않았을 때 추가 버튼을 누르거나 엔터키를 눌러도 아무 동작하지 않습니다', () => {
    const { container } = render(
      <TaskProvider initialTask={tasks}>
        <TodoListView />
      </TaskProvider>
    );
    const initialSnapshot = container.innerHTML;

    const input = screen.getByPlaceholderText('todo');
    const button = screen.getByRole('button', { name: '+' });
    fireEvent.click(button);
    expect(container.innerHTML).toMatchSnapshot(initialSnapshot);

    //엔터키
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(container.innerHTML).toMatchSnapshot(initialSnapshot);
  });

  it('유저가 테스크 내용을 입력하는 영역에 입력을 했을 때 추가 버튼을 누르거나 엔터 버튼을 누르면 대기 리스트의 가장 아래에 완료되지 않은 테스크가 추가됩니다.', () => {
    render(
      <TaskProvider initialTask={tasks}>
        <TodoListView />
      </TaskProvider>
    );
    const input = screen.getByPlaceholderText('todo');
    const button = screen.getByRole('button', { name: '+' });
    const inProgress = screen.getByTestId('inProgress-section');

    //추가 버튼 클릭
    fireEvent.change(input, { target: { value: 'new task' } });
    fireEvent.click(button);
    let pElements = inProgress.querySelectorAll('p');
    let lastTaskText = pElements[pElements.length - 1].textContent;
    expect(lastTaskText).toBe('new task');

    //엔터키
    fireEvent.change(input, { target: { value: 'Enter Test' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    pElements = inProgress.querySelectorAll('p');
    lastTaskText = pElements[pElements.length - 1].textContent;
    expect(lastTaskText).toBe('Enter Test');
  });
});

describe('유저는 리스트의 태스크들을 완료 처리하거나 완료 취소 처리한다.', () => {
  test('유저가 완료되지 않은 테스크의 체크박스를 클릭하면 체크 박스가 체크되고 완료 리스트로 넘어간다. 그리고 테스크 설명에 취소선이 생긴다.', async () => {
    const user = userEvent.setup();
    render(
      <TaskProvider initialTask={tasks}>
        <TodoListView />
      </TaskProvider>
    );

    const checkbox = screen.getByTestId<HTMLInputElement>('회의 준비');
    await userEvent.click(checkbox);
    await waitFor(() => {
      const InProgress = screen.getByTestId('inProgress-section');
      const Completed = screen.getByTestId('completed-section');
      const task = screen.getByText('회의 준비');
      expect(Completed).toContainElement(task);
      expect(InProgress).not.toContainElement(task);
      expect(checkbox.checked).toBe(true);
      expect(task).toHaveClass('line-through');
    });
  });

  test('유저가 완료된 테스크의 체크박스를 클릭하면 체크가 해제되고 대기 리스트로 올라간다. 그리고 테스크 설명의 취소선이 없어진다.', async () => {
    const user = userEvent.setup();
    render(
      <TaskProvider initialTask={tasks}>
        <TodoListView />
      </TaskProvider>
    );

    let checkbox = screen.getByTestId<HTMLInputElement>('회의 준비');
    await user.click(checkbox);
    await waitFor(() => {
      const InProgress = screen.getByTestId('inProgress-section');
      const Completed = screen.getByTestId('completed-section');
      const task = screen.getByText('회의 준비');
      expect(Completed).toContainElement(task);
      expect(InProgress).not.toContainElement(task);
      expect(checkbox.checked).toBe(true);
      expect(task).toHaveClass('line-through');
    });

    //해제
    checkbox = screen.getByTestId<HTMLInputElement>('회의 준비');
    await user.click(checkbox);
    await waitFor(() => {
      const InProgress = screen.getByTestId('inProgress-section');
      const task = screen.getByText('회의 준비');
      expect(InProgress).toContainElement(task);
      expect(checkbox.checked).toBe(false);
      expect(task).not.toHaveClass('line-through');
    });
  });
});

describe('유저가 테스크를 삭제한다.', () => {
  test('대기 또는 완료리스트에 테스크가 있을 때 해당하는 테스크 우측 삭제 버튼을 누르면 테스크가 삭제되고, 리스트에서 없어진다.', async () => {
    const user = userEvent.setup();
    render(
      <TaskProvider initialTask={tasks}>
        <TodoListView />
      </TaskProvider>
    );

    // 대기리스트에 테스크가 있을 때
    const InProgress = screen.getByTestId('inProgress-section');
    const taskItems = InProgress.querySelectorAll('p');
    expect(taskItems.length).toBeGreaterThan(0);

    // 테스크 우측 삭제버튼을 누르면 테스크가 삭제되고 리스트에서 없어진다

    const task = screen.getByText('회의 준비');
    expect(InProgress).toContainElement(task);
    const button = screen.getByTestId('button-회의 준비');
    await user.click(button);
    await waitFor(() => {
      expect(task).not.toBeInTheDocument();
      expect(InProgress).not.toContainElement(task);
    });

    //완료리스트에 테스크가 있을 때
    const Completed = screen.getByTestId('completed-section');
    const completedTasks = Completed.querySelectorAll('p');
    expect(completedTasks.length).toBeGreaterThan(0);

    // 테스크 우측 삭제버튼을 누르면 테스크가 삭제되고 리스트에서 없어진다

    const taskItem = screen.getByText('보고서 작성');
    expect(Completed).toContainElement(taskItem);
    const buttonItem = screen.getByTestId('button-보고서 작성');
    await user.click(buttonItem);
    await waitFor(() => {
      expect(taskItem).not.toBeInTheDocument();
      expect(Completed).not.toContainElement(taskItem);
    });
  });
});

describe('Clear All 버튼을 눌러 완료된 테스크 들을 삭제한다.', () => {
  test('완료 리스트에 완료된 테스크가 존재 할 때 Clear All 버튼을 누르면 Task 리스트에서 완료된 테스크가 모두 삭제되고 Empty란 글자가 나타난다.', async () => {
    const user = userEvent.setup();

    render(
      <TaskProvider initialTask={tasks}>
        <TodoListView />
      </TaskProvider>
    );

    // 완료 리스트에 완료된 테스크가 존재 할 때
    const Completed = screen.getByTestId('completed-section');
    const completedTasks = Completed.querySelectorAll('p');
    expect(completedTasks.length).toBeGreaterThan(0);
    const InProgress = screen.getByTestId('inProgress-section');
    const InProgressTasks = InProgress.querySelectorAll('p').length;
    // Clear All 버튼을 누르면 Task 리스트에서 완료된 테스크가 모두 삭제되고 Empty란 글자가 나타난다.

    const ClearAllButton = screen.getByRole('button', { name: 'Clear All' });
    await user.click(ClearAllButton);
    await waitFor(() => {
      const emptyParagraph = Completed.querySelector('p');
      const afterClickInProgressTasks = InProgress.querySelectorAll('p').length;
      expect(emptyParagraph).toHaveTextContent('Empty');
      expect(InProgressTasks).toEqual(afterClickInProgressTasks);
    });
  });
});
