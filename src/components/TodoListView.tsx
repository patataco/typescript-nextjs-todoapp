import TasksList from '@/components/TasksList';
import { Task } from '@/type/type';
import { useCheckbox } from '../../hooks/useCheckbox';

import { TaskProvider, useTasks } from '@/context/TaskContext';
import NewTask from './NewTask';
import TodoFooter from './TodoFooter';
import { useEffect } from 'react';

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
const TodoListView = () => {
 
  const { isChecked, setIsChecked, handleCheck } = useCheckbox(false);
  const { tasks, deleteTask, addTask, updateTask } = useTasks();
  return (
    <div className="flex items-center justify-center h-screen max-w-5xl mx-auto bg-blue-100 ">
      <div className="h-[800px] w-[600px]  bg-gray-50 ">
        <div className="flex flex-col items-center h-full gap-6 px-10 py-9">
          <h1>To-do List</h1>
          <NewTask />
          <h2>Tasks</h2>
          <TasksList
            data-testId="inProgress-section"
            tasks={tasks.filter((task) => task.status !== 'completed')}
          />
          <h2>Tasks Done</h2>
          <TasksList
            data-testId="completed-section"
            tasks={tasks.filter((task) => task.status === 'completed')}
          />
          <TodoFooter />
        </div>
      </div>
    </div>
  );
};

export default TodoListView;
