import { RecoilRoot, useRecoilState } from 'recoil';

import TodoListView from '@/components/TodoListView';
import { TaskProvider } from '@/context/TaskContext';
import { tasksState } from '@/recoil/todo/atom';

export default function V2() {
  const [tasks, setTasks] = useRecoilState(tasksState);

  // useEffect(() => {
  //   const tasksInStorage = localStorage.getItem('tasks');
  //   console.log(tasksInStorage);
  //   if (tasksInStorage) {
  //     const newTasks = JSON.parse(tasksInStorage);
  //     console.log(newTasks);
  //     setTasks(newTasks);
  //   } else {
  //     setTasks([]);
  //   }
  // }, []);

  return (
    <>
      <RecoilRoot>
        <TaskProvider initialTask={tasks}>
          <TodoListView />
        </TaskProvider>
      </RecoilRoot>
    </>
  );
}
